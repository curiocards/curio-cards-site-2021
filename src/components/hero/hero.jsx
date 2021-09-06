import React from "react";
import "../global.css";
import "../reset.css";
import "./hero.css"
import "../fonts/type.css"
import logo from "../../images/logo.svg" 
import cards from "../../images/cards.svg" 

class Hero extends React.Component {
  render() {
    return (
      <main>
        <img src={logo} alt="" className="illo-logo" />
        <div className="centerpiece">
          <img src={cards} alt="" className="illo-cards" />
          <h1>First NFT art on Ethereum</h1>
          <a  href="https://opensea.io/collection/curiocardswrapper" target="_blank" rel="noopener noreferrer" className="cell orangeLight border shadow center button">Buy &amp; Sell</a>
        </div>
        <footer>
          <a href="https://docs.curio.cards/" target="_blank" rel="noopener noreferrer" className="footer__link orangeLight border cell center">About the Project</a>
          <a href="https://discord.curio.cards" target="_blank" rel="noopener noreferrer" className="footer__link orange border cell center">Join the Discord</a>
          <a href="https://twitter.com/MyCurioCards" target="_blank" rel="noopener noreferrer"className="footer__link orangeLight border cell center">Follow us on Twitter</a>
        </footer>
      </main>
    );
  }
}

export default Hero