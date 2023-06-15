import React from "react";
import style from "./ProgressBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ProgressBar extends React.Component {
  render() {
    const { progressBarIcons } = this.props;
    const progressIcons = [
      {
        text: "Cart",
        bool: true,
        fontAwesome: progressBarIcons["bag"]["icon"],
        value: "bag",
      },
      {
        text: "Shipping",
        bool: true,
        fontAwesome: progressBarIcons["shipping"]["icon"],
        value: "shipping",
      },
      {
        text: "Payment",
        bool: true,
        fontAwesome: progressBarIcons["payment"]["icon"],
        value: "payment",
      },
      {
        text: "Confirmation",
        bool: false,
        fontAwesome: progressBarIcons["confirmation"]["icon"],
        value: "confirmation",
      },
    ];
    return (
      <div className={style.progressBar}>
        {progressIcons.map((icon) => (
          <>
            <div className={style.flex}>
              <div
                className={`
                    ${style.circle} 
                    ${progressBarIcons[icon.value]["circle"]}
                  `}
              >
                <FontAwesomeIcon
                  icon={icon.fontAwesome}
                  className={`
                      ${style.icon} 
                      ${progressBarIcons[icon.value]["innerColor"]}
                      `}
                />
              </div>
              <p>{icon.text}</p>
            </div>
            {icon.bool && (
              <hr
                className={`${style.hr} ${progressBarIcons[icon.value]["hr"]}`}
              />
            )}
          </>
        ))}
      </div>
    );
  }
}

export default ProgressBar;
