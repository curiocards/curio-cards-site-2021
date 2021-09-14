import React from "react";

import "../global.css";
import "../reset.css";
import "./detail.css"
import "../fonts/type.css"

import close from "../../images/i-close.svg"
import opensea from "../../images/opensea-transparent-blue.svg"
import { cardImages } from "../constants.jsx";

class Detail extends React.Component {
  render() {
    // if card prop was not passed, don't display anything
    if (!this.props.card)
      return null;

    const currentArtist = this.props.artists.find(a => a.name === this.props.card.artist);
    let artistTwitter = null, artistWebsite = null;
    if (currentArtist.twitter) {
      artistTwitter = <a target="_blank" href={`https://twitter.com/${currentArtist.twitter}`}>
          <p className="cell orangeLight on-hover-white center border">{`@${currentArtist.twitter}`}</p>
        </a>;
    }

    if (currentArtist.website) {
      artistWebsite = <a target="_blank" href={`https://${currentArtist.website}`}>
          <p className="cell orangeLight on-hover-white center border">{currentArtist.website}</p>
        </a>;
    }

    let biography = currentArtist.biography;
    if (biography && biography.startsWith("https://www.youtube.com")) {
      biography = <p className="description white youtube-video-container"><iframe className="youtube-video" src="https://www.youtube-nocookie.com/embed/SZagM-shBMU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></p>
    } else {
      biography = <p className="description white">{biography}</p>
    }

    return (
      <main className="overlay">
        <button className="icon close cell orange" onClick={this.props.deselectCardCallback}> <img src={close} alt="Close card" /> </button>
        <article className="card-info">
          <img src={cardImages[this.props.card.number]} alt="" className="card-img-detail" />
          <div className="card-txt">
            <div className="pair-wrapper">
              <p className="cell orange center border">{this.props.card.title}</p>
              <p className="cell orangeLight center border">By {this.props.card.artist}</p>
            </div>
            <div className="pair-cell">
              <p className="cell white center border"> Supply</p>
              <p className="cell white center border">x{this.props.card.supply}</p>
            </div>
            <p className="description white">{this.props.card.description}</p>
          </div>
        </article>
        <a href={`https://opensea.io/assets/0x73da73ef3a6982109c4d5bdb0db9dd3e3783f313/${this.props.card.number}`} target="_blank" rel="noopener noreferrer" className="cell orangeLight border shadow center button">
          {/* <img src={opensea} alt="Opensea" className="opensea-icon button-icon" /> */}
          {`Buy ${this.props.card.title}`}
        </a>
        <article className="artist-info">
          <div className="artist-txt">
            <p className="cell orange center border">About {this.props.card.artist}</p>
            <div className="pair-cell">
              {artistTwitter}
              {artistWebsite}
            </div>
            {biography}
          </div>
        </article>

      </main>
    );
  }
}

export default Detail