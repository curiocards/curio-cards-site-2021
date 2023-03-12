import React from "react";
import "../global.css";
import "../reset.css";
import "./hero.css"
import "../fonts/type.css"
import logo from "../../images/logo.svg" 
import cards from "../../images/cards.svg" 
import opensea from "../../images/opensea-transparent-blue.svg"
import twitter from "../../images/Twitter-Blue.svg"
import discord from "../../images/Discord-Logo-Color.svg"
import info from "../../images/Info-Icon.svg"
import curio from "../../images/CURIO.svg"

class Hero extends React.Component {
  render() {
    return (
      <main>
        <img src={logo} alt="" className="illo-logo" />
        <div className="centerpiece">
          <img src={cards} alt="" className="illo-cards" />
          <h1>First Art Show NFTs on Ethereum</h1>
          <a href="https://opensea.io/collection/curiocardswrapper" target="_blank" rel="noopener noreferrer" className="cell orangeLight border shadow center button">
          {/* <img src={opensea} alt="" className="opensea-icon button-icon" /> */}
          Buy &amp; Sell</a>
        </div>
        <footer>
          <a href="https://docs.curio.cards/" target="_blank" rel="noopener noreferrer" className="footer__link orangeLight border cell center on-hover-white">
            <img src={info} alt="" className="button-icon" />
            About the Project
          </a>

          <a href="https://discord.curio.cards" target="_blank" rel="noopener noreferrer" className="footer__link orange border cell center on-hover-white">
            <img src={discord} alt="" className="button-icon discord-icon" />
            <img src={curio} className="illo-curio" alt="" />
            Join the Discord
          </a>

          <a href="https://twitter.com/MyCurioCards" target="_blank" rel="noopener noreferrer"className="footer__link orangeLight border cell center on-hover-white">
            <img src={twitter} alt="" className="button-icon twitter-icon" />
            Follow us on Twitter
          </a>
        </footer>
      </main>
    );
  }
}

export default Hero
