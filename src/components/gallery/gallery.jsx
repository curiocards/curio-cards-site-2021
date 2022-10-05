import React from "react";
import { navigate } from "gatsby"
import { ethers } from "ethers"

import "../global.css";
import "../reset.css";
import "./gallery.css"
import "../fonts/type.css"

import close from "../../images/i-close.svg"
import search from "../../images/i-search.svg"
import { cardImages} from "../constants.jsx";
import { getCards, getCardIDFromAddress } from "../../services/graph";

import Resolution from "@unstoppabledomains/resolution";
const _ = require('lodash');

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    const provider = new ethers.providers.InfuraProvider("homestead", {
      projectId: "8ce4ac4e12ce4034ba6cc1266b23c8d4",
    });

    this.state = {
      cards: [],
      selectedAddress: props.selectedAddress,
      provider: provider,
      loading: true,
      lookupFailure: false
    };

    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  async componentDidMount() {
    // asynchronously kick off address lookup
    this.updateCards(this.state.selectedAddress);
  }

  handleAddressSubmit(e) {
    e.preventDefault(); // prevent default form action

    if (this.state.selectedAddress) {
      // address already set- clear it
      navigate("/");
      this.updateCards();
    } else {
      const addr = document.getElementById("address-input").value;
      if (addr) {
        navigate(`/?address=${addr}`);
        this.updateCards(addr);
      } else {
        navigate("/");
        this.updateCards();
      }
    }
  }

  handleCardClick(e) {
    const id = e.target.closest("figure").id;
    if (Number(id) === Number(this.props.selectedCardNumber)) {
      // already selected, deselect it
      this.props.deselectCardCallback();
    } else {
      this.props.selectCardCallback(e.target.closest("figure").id);
    }
  }

  async updateCards(inputAddress) {
    this.setState({
      loading: true,
      lookupFailure: false
    });

    let cards = _.cloneDeep(this.props.cards);
    let holdings = {};

    if (!inputAddress){
      this.setState({
        cards: cards,
        loading: false,
      });
      return;
    }

    var parsedInput = inputAddress;
    try {
      // parse ENS/UD domain names
      console.debug(`examining addr ${inputAddress}...`);
      if (inputAddress.includes(".")) {
        // ENS name?
        console.debug("parse as ens...");
        parsedInput = await this.state.provider.resolveName(inputAddress);
        console.debug(`parsedInput: ${parsedInput}`);

        if (!parsedInput) {
          console.debug("parse as UD");
          // detect if unstoppable domain
          const resolution = Resolution.fromEthersProvider(this.state.provider);
          parsedInput = await resolution.addr(inputAddress, "ETH");
          console.debug(`parsedInput: ${parsedInput}`);
        }
      }

      // Ensure computed address is valid
      var result = ethers.utils.getAddress(parsedInput)
    }
    catch (e) {
      console.warn("Unable to parse address");
      console.error(e);
      this.setState({
        cards: [],
        loading: false,
        lookupFailure: true
      });
      return;
    }
    
    
    if (parsedInput) {
      // Fetch holdings for address
      try {
        var cardBalances = await getCards(parsedInput.toLowerCase());
      } catch (e) {
        console.warn("Unable to fetch balances");
        console.error(e);
        this.setState({
          lookupFailure: true
        });
        return;
      }

      if(cardBalances.length === 0) {
        this.setState({
          cards: [],
          loading: false,
        });
        return;
      }

      for (let i = 0; i < cardBalances.length; i++) {
        let cardId = getCardIDFromAddress(cardBalances[i].type.id)
        holdings[cardId] = {
          "erc1155": parseInt(cardBalances[i].wrappedOfficial) + parseInt(cardBalances[i].wrappedUnofficial),
          "erc20": parseInt(cardBalances[i].unwrapped)
        };
      }

      // Populate address supply
      if (Object.keys(holdings).length > 0) {
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].number in holdings) {
            cards[i].supply = holdings[cards[i].number].erc1155 + holdings[cards[i].number].erc20;
            cards[i].holdings = holdings[cards[i].number];
          } else {
            cards[i].supply = 0;
          }
        }
      }

      console.debug(`Curio balance for address ${parsedInput}:\n${JSON.stringify(holdings, null, 2)}`);
    }

    this.setState({
      cards: cards,
      loading: false,
    });
  }

  render() {
    const artists = [...new Set(this.props.cards.map(c => c.artist))];
    const artistOptions = artists.map(x => <option className="cell white" key={x}>{x}</option>);

    let cards = _.cloneDeep(this.state.cards);

    // filter by artist
    if (this.props.artistFilter !== "All Artists") {
      cards = cards.filter(c => c.artist === this.props.artistFilter);
    }

    // sort
    switch (this.props.sort) {
      case "Chronological":
        cards.sort((a, b) => a.number - b.number);
        break;
      case "Supply: Low to High":
        cards.sort((a, b) => a.supply - b.supply);
        break;
      case "Supply: High to Low":
        cards.sort((a, b) => b.supply - a.supply);
        break;
      default:
        console.warn("Unexpected sort case fallthrough");
    }

    let gallery = null;
    if (this.state.lookupFailure) {
      gallery = <p className="warning-message">{`Error fetching cards for address ${this.state.selectedAddress}.`}</p>;
    } else if (this.state.loading) {
      gallery = <p className="warning-message">Loading...</p>;
    } else if (cards.find(card => card.supply > 0)) {
      gallery = cards.map(card => {
        if (card.holdings != null) {
          // handle as user balance
          if (card.holdings.erc20 > 0 || card.holdings.erc1155 > 0) {
            return <figure className={`card border ${card.number === Number(this.props.selectedCardNumber) ? "scale-down" : ""}`} onClick={this.handleCardClick} key={card.number} id={card.number}>
                <div className={`card-eth-overlay ${card.number === Number(this.props.selectedCardNumber) ? "selected" : ""}`}></div>
                <img src={cardImages[card.number]} alt="" className={`card-img ${card.number === this.props.selectedCardNumber ? "grayscale" : ""}`} />
                {/* <figcaption className="card-title cell orange center border">{card.title}</figcaption> */}
                {/* <p className="card-artist cell white center border">By {card.artist}</p> */}
                <div className="pair-cell">
                  <p className="card-price cell orangeLight center border" title="Wrapped">Wrapped</p>
                  <p className="card-supply cell orange center border" title="Wrapped card supply">x{card.holdings.erc1155}</p>
                </div>
                <div className="pair-cell">
                  <p className="card-price cell orangeLight center border" title="Unwrapped">Unwrapped</p>
                  <p className="card-supply cell orangeLight center border" title="Unwrapped card supply">x{card.holdings.erc20}</p>
                </div>
              </figure>;
          } else {
            return null;
          }
        } else if (card.supply > 0) {
          // handle as general card display
          return <figure className={`card border ${card.number === Number(this.props.selectedCardNumber) ? "scale-down" : ""}`} onClick={this.handleCardClick} key={card.number} id={card.number}>
              <div className={`card-overlay ${card.number === Number(this.props.selectedCardNumber) ? "selected" : ""}`}></div>
              <img src={cardImages[card.number]} alt="" className={`card-img ${card.number === this.props.selectedCardNumber ? "grayscale" : ""}`} />
              {/* <figcaption className="card-title cell orange center border">{card.title}</figcaption>
              <p className="card-artist cell white center border">By {card.artist}</p>
              <div className="pair-cell">
                <p className="card-price cell orangeLight center border">Supply</p>
                <p className="card-supply cell orange center border">x{card.supply}</p>
              </div> */}
            </figure>;
        } else {
          // not ready yet
          return null;
        }
      });
    } else {
      gallery = <p className="warning-message">{`No cards for address ${this.state.selectedAddress}.`}</p>;
    }

    let leaderboardMessage = null;
    if (this.state.selectedAddress && !this.state.loading) {
      leaderboardMessage = <div className="orangeLight center pair-cell hide-on-mobile">
        <p className="orangeLight center cell border leaderboard">Curious who has most cards?&#160;<a target="_blank" rel="noopener noreferrer" className="orangeLight underline center cell" href="https://leaderboard.curio.cards/"> See the Leaderboard</a></p>
        
      </div>;
    }

    let formattedAddress = this.state.selectedAddress;
    if (formattedAddress && formattedAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      formattedAddress = formattedAddress.substring(0, 6) + "..." + formattedAddress.slice(-4);
    }

    return (
      <aside>
        {/* Gallery */}
        <section className="gallery">
          {gallery}
        </section>

        {/* Sorter */}
        <nav>
          <div className="nav-inner">
            <form onSubmit={this.handleAddressSubmit} autoComplete="off">
              <input type="text" className="cell border white input__eth" id="address-input" autoComplete="off" spellCheck="false"
                placeholder="Address or ENS Lookup" defaultValue={formattedAddress} disabled={!!this.state.selectedAddress} />
              {
                !!this.state.selectedAddress ?
                  <button className="icon dropdown__icon cell orange"> <img src={close} alt="Close address" /> </button>
                :
                  <button className="icon dropdown__icon cell orange"> <img src={search} alt="Search for address" /> </button>
              }
            </form>

            <form action="">
              <select className="dropdown cell white" value={this.props.artistFilter} onChange={(e) => this.props.setArtistFilterCallback(e.target.value)}>
                <option className="cell white">
                  All Artists
                </option>
                {artistOptions}
              </select>
            </form>

            <form action="">
              <select className="dropdown cell white" value={this.props.sort} onChange={(e) => this.props.setSortCallback(e.target.value)}>
                <option className="cell white">
                  Chronological
                </option>
                <option className="cell white">
                  Supply: High to Low
                </option>
                <option className="cell white">
                  Supply: Low to High
                </option>
              </select>
            </form>
          </div>

          {leaderboardMessage}
        </nav>

      </aside>
    );
  }
}

export default Gallery