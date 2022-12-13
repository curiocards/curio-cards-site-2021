import React from "react";
import "../global.css";
import "../reset.css";
import "./notification.css"
import "../fonts/type.css"

class Notification extends React.Component {
  render() {
    return (
        <p className="pink center">
            ✨ Check out Curio&#39;s Snow Globes! Free mint for Curio Card holders: <a style={{ marginLeft: "0.5em", marginRight: "0.5em", textDecoration: "underline" }} href="https://dao.curio.cards/snowglobes">dao.curio.cards/snowglobes</a> ✨
        </p>
    );
  }
}

export default Notification
