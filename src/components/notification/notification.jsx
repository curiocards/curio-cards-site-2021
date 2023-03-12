import React from "react";
import "../global.css";
import "../reset.css";
import "./notification.css"
import "../fonts/type.css"

class Notification extends React.Component {
  render() {
    return (
        <p className="pink center">
            ✨ Stay tuned for a holiday announcement this Tuesday, December 13th... ✨
        </p>
    );
  }
}

export default Notification
