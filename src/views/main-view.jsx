import * as React from "react"
import { navigate } from "gatsby"

import Hero  from "../components/hero/hero"
import Gallery  from "../components/gallery/gallery"
import Detail  from "../components/detail/detail"

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCardNumber: this.props.selectedCardNumber,
      artistFilter: this.props.artistFilter || "All Artists",
      sort: this.props.sort || "Chronological"
    };

    this.selectCardCallback = this.selectCardCallback.bind(this);
    this.deselectCardCallback = this.deselectCardCallback.bind(this);
    this.setArtistFilterCallback = this.setArtistFilterCallback.bind(this);
    this.setSortCallback = this.setSortCallback.bind(this);
  }

  selectCardCallback(cardNumber) {
    if (!this.props.selectedAddress) {
      navigate(`/card/${cardNumber}`,
        {
          state: {
            artistFilter: this.state.artistFilter,
            sort: this.state.sort
          }
        });
    } else {
      console.debug("Selecting card " + cardNumber);

      // if on mobile, scroll to top
      if (!window.matchMedia("only screen and (min-width: 1280px)").matches) {
        window.scrollTo(0, 0);
      }

      this.setState({selectedCardNumber: cardNumber});
    }
  }

  deselectCardCallback() {
    if (!this.props.selectedAddress) {
      navigate(`/`,
        {
          state: {
            artistFilter: this.state.artistFilter,
            sort: this.state.sort
          }
        });
    } else {
      this.setState({selectedCardNumber: null});
    }
  }

  setArtistFilterCallback(val) {
    this.setState({artistFilter: val});
  }

  setSortCallback(val) {
    this.setState({sort: val});
  }

  render() {
    const selectedCard = this.props.allCards.nodes.find(card => card.number === Number(this.state.selectedCardNumber));

    return (
      <div className="container">
        <Hero />

        <Gallery cards={this.props.allCards.nodes} selectedCardNumber={this.state.selectedCardNumber} selectedAddress={this.props.selectedAddress}
          artistFilter={this.state.artistFilter} sort={this.state.sort}
          selectCardCallback={this.selectCardCallback} deselectCardCallback={this.deselectCardCallback}
          setArtistFilterCallback={this.setArtistFilterCallback} setSortCallback={this.setSortCallback} />

        <Detail card={selectedCard} artists={this.props.allArtists.nodes} deselectCardCallback={this.deselectCardCallback} />
      </div>
    );
  }
}

export default MainView;