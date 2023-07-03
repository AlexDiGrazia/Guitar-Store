import React from "react";
import style from "./Confirmation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

class Confirmation extends React.Component {
  render() {
    const { nextPage } = this.props;

    const buttons = [
      {
        text: "TRACK ORDER",
        className: style.trackOrder,
      },
      {
        text: "BACK TO HOMEPAGE",
        className: style.backToHomePage,
        onClick: (e) => nextPage("homePage"),
      },
    ];

    return (
      <div className={style.background}>
        <h2>Confirmation</h2>
        <div className={style.text}>
          <FontAwesomeIcon icon={faCircleCheck} className={style.checkMark} />
          <h3>
            Congratulations!<br></br> Your order is accepted.
          </h3>
          <p>
            Lorem ipsum dolor Lorem ipsum dolor sit. sit amet consectetur{" "}
            <br></br>Lorem ipsum dolor sit Lorem ipsum dolor sit. amet.
          </p>
          {buttons.map((btn) => (
            <button className={btn.className} onClick={btn.onClick}>
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Confirmation;
