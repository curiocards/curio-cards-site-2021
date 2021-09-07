import React from "react";
import { navigate } from "gatsby"
import { ethers } from "ethers";

import "../global.css";
import "../reset.css";
import "./gallery.css"
import "../fonts/type.css"

import close from "../../images/i-close.svg"
import search from "../../images/i-search.svg"
import { cardImages, wrapperAddr, wrapperAbi, curioAddresses, erc20Abi } from "../constants.jsx";

var _ = require('lodash');

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    const provider = new ethers.providers.InfuraProvider("homestead", {
      projectId: "0fcdb79aa8cf43dabf8f61a492f63a00",
      //projectSecret: "eb3062f9f0644f4e97c299649ed3b43d"
    });

    this.state = {
      cards: [],
      selectedAddress: props.selectedAddress,
      provider: provider,
      loading: true,
    };

    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this)
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

  async getErc20Balance(addr, cardNumber) {
    const contractAddr = curioAddresses["CRO" + cardNumber];
    const contract = await new ethers.Contract(contractAddr, erc20Abi, this.state.provider);
    return await contract.balanceOf(addr);
  }

  async getErc1155BalanceBatch(addr) {
    const contract = await new ethers.Contract(wrapperAddr, wrapperAbi, this.state.provider);
    const addrArray = Array(30).fill(addr);
    let idArray = Array.from(Array(31).keys());
    idArray.shift();
    return await contract.balanceOfBatch(addrArray, idArray);
  }

  async updateCards(address) {
    this.setState({loading: true});
    let cards = _.cloneDeep(this.props.cards);

    let holdings = null;
    if (address) {
      if (address.match(/^0x[a-fA-F0-9]{40}$/)) {
        holdings = {};

        let erc20Promises = [];
        for (let i = 1; i < 31; i++)
          erc20Promises.push(this.getErc20Balance(address, i));
        const erc1155Promise = this.getErc1155BalanceBatch(address);

        const erc20Balances = await Promise.all(erc20Promises);
        const erc1155Balances = await erc1155Promise;

        for (let i = 0; i < 30; i++) {
          holdings[i+1] = {
            "erc1155": parseInt(erc1155Balances[i]._hex, 16),
            "erc20": parseInt(erc20Balances[i], 10)
          };
        }
        console.debug(`Curio balance for address ${address}:\n${JSON.stringify(holdings, null, 2)}`);
      } else {
        console.warn(`Invalid ethereum address! (${address})`);
      }
    }

    // If an address was defined, set the holdings to this address's supply
    if (holdings && Object.keys(holdings).length > 0) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].number in holdings) {
          cards[i].supply = holdings[cards[i].number].erc1155 + holdings[cards[i].number].erc20;
          cards[i].holdings = holdings[cards[i].number];
        } else {
          cards[i].supply = 0;
        }
      }
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
    if (this.state.loading) {
      gallery = <p>Loading...</p>;
    } else if (cards.find(card => card.supply > 0)) {
      gallery = cards.map(card => {
        if (card.holdings != null) {
          // handle as user balance
          if (card.holdings.erc20 > 0 || card.holdings.erc1155 > 0) {
            return <figure className={`card border ${card.number === Number(this.props.selectedCardNumber) ? "scale-down" : ""}`} onClick={this.handleCardClick} key={card.number} id={card.number}>
                <div className={`card-overlay ${card.number === Number(this.props.selectedCardNumber) ? "selected" : ""}`}></div>
                <img src={cardImages[card.number]} alt="" className={`card-img ${card.number === this.props.selectedCardNumber ? "grayscale" : ""}`} />
                <figcaption className="card-title cell orange center border">{card.title}</figcaption>
                <p className="card-artist cell white center border">By {card.artist}</p>
                <div className="pair-cell">
                  <p className="card-price cell orangeLight center border">unwrap: {card.holdings.erc20}</p>
                  <p className="card-supply cell orange center border">wrap: {card.holdings.erc1155}</p>
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
              <figcaption className="card-title cell orange center border">{card.title}</figcaption>
              <p className="card-artist cell white center border">By {card.artist}</p>
              <div className="pair-cell">
                <p className="card-price cell orangeLight center border">Supply</p>
                <p className="card-supply cell orange center border">x{card.supply}</p>
              </div>
            </figure>;
        } else {
          // not ready yet
          return null;
        }
      });
    } else {
      gallery = <p>No cards for address {this.state.selectedAddress}.</p>;
    }

    let leaderboardMessage = null;
    if (this.state.selectedAddress && !this.state.loading) {
      leaderboardMessage = <div className="orangeLight center pair-cell hide-on-mobile">
        <p className="orangeLight center cell border">Curious who has most cards?</p>
        <a target="_blank" rel="noopener noreferrer" className="orange center cell border" href="https://leaderboard.curio.cards/"> <p>See the Leaderboard!</p></a>
      </div>;
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
                placeholder="Wallet Lookup" defaultValue={this.state.selectedAddress} disabled={!!this.state.selectedAddress} />
              {
                !!this.state.selectedAddress ?
                  <button className="icon dropdown__icon cell orange"> <img src={close} alt="" /> </button>
                :
                  <button className="icon dropdown__icon cell orange"> <img src={search} alt="" /> </button>
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