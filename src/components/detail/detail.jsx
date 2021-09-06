import React from "react";

import "../global.css";
import "../reset.css";
import "./detail.css"
import "../fonts/type.css"

import close from "../../images/i-close.svg"
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
          <p className="cell orangeLight center border">{`@${currentArtist.twitter}`}</p>
        </a>;
    }

    if (currentArtist.website) {
      artistWebsite = <a target="_blank" href={`https://${currentArtist.website}`}>
          <p className="cell orangeLight center border">{currentArtist.website}</p>
        </a>;
    }

    return (
      <main className="overlay">
        <button className="icon close cell orange" onClick={this.props.deselectCardCallback}> <img src={close} alt="" /> </button>
        <article className="card-info">
          <img src={cardImages[this.props.card.number]} alt="" className="card-img-detail" />
          <div className="card-txt">
            <div className="pair-wrapper">
              <p className="cell orange center border">{this.props.card.title}</p>
              <p className="cell white center border">By {this.props.card.artist}</p>
            </div>
            <div className="pair-cell">
              <p className="cell orangeLight center border"> Supply</p>
              <p className="cell orange center border">x{this.props.card.supply}</p>
            </div>
            <p className="description white">{this.props.card.description}</p>
          </div>
        </article>
        <article className="artist-info">
          <div className="artist-txt">
            <p className="cell orange center border">About {this.props.card.artist}</p>
            <div className="pair-cell">
              {artistTwitter}
              {artistWebsite}
            </div>
            <p className="description white">{currentArtist.biography}</p>
          </div>
        </article>
        <a href={`https://${this.props.card.buyLink}`} target="_blank" rel="noopener noreferrer" className="cell orangeLight border shadow center button">
          {`Buy ${this.props.card.title}`}
        </a>
      </main>
    );
  }
}

export default Detail