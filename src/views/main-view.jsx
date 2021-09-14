import * as React from "react"
import { Helmet } from "react-helmet"
import { navigate } from "gatsby"
import Fade from 'react-reveal/Fade';

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
        <Helmet>
          <html lang="en" />
          <title>Curio Cards</title>
          <link rel="canonical" href="https://curio.cards" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#F57040" />
          <meta name="description" content="Curio Cards is an online art show and permanent gallery that launched on May 9, 2017." />

          <meta property="og:title" content="Curio Cards" />
          <meta property="og:image" content="https://curio.cards/icons/icon-512x512.png" />
          <meta property="og:url" content="https://curio.cards" />
          <meta property="og:description" content="Curio Cards is an online art show and permanent gallery that launched on May 9, 2017." />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="MyCurioCards" />
          <meta name="twitter:title" content="Curio Cards" />
          <meta name="twitter:description" content="Curio Cards is an online art show and permanent gallery that launched on May 9, 2017." />
          <meta name="twitter:image" content="/icons/icon-512x512.png" />

        </Helmet>

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