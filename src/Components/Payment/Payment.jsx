import React from "react";
import style from "./Payment.module.css";
import InputBase from "../InputBase/InputBase";
import Select from "../Select/Select";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faDisplay } from "@fortawesome/free-solid-svg-icons";
import {
  cardNumberValidation,
  OTHERCARDS,
  securityCodeValidation,
  CARD,
  CARDICON,
} from "../../JS/creditCard";

// import inputBaseStyle from "../InputBase/InputBase.module.css"

class Payment extends React.Component {
  state = {
    cvvInfo: "displayNone",
    cardType: "",
    error: {},
  };

  mapInputBase = (array) => {
    const { error, cardType } = this.state
    return array.map((obj) => (
      <div className={style.relative}>
        <InputBase
          id={obj.id}
          text={obj.text}
          name={obj.name}
          inputBaseClass={style.inputBaseClass}
          labelClassList={obj.labelClassList}
          classList={obj.classList}
          maxLength={obj.maxLength}
          shortDiv={obj.shortDiv}
          onChange={obj.onChange}
          value={obj.value}
          onBlur={obj.onBlur}
          noMarginBottom={obj.noMarginBottom}
        />
        {obj.errorM && <p className={style.error}>{obj.errorM}</p>}
        {(!error || !error.cardError) && obj.isCard && CARD.includes(cardType) && (
          <img 
            className={style.creditCardIcon}
            src={CARDICON[cardType]} 
            alt="card"></img>
        )}
      </div>
    ));
  };

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  handleBlur = (value, type) => {
    let errorText;
    switch (type) {
      case "card":
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error,
            cardError: errorText,
          },
        }));
        break;
      case "securityCode":
        errorText = securityCodeValidation(3, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, securityCodeError: errorText },
        }));
        break;
      default:
        break;
    }
  };

  showInfo = {};
  render() {
    const { error, cardType } = this.state;
    const { maskCreditCard, paymentPageState, nestedStateObjectSetter } =
      this.props;

    const inputsArray = [
      {
        id: "name",
        text: "Cardholder Name",
        name: "name",
        labelClassList: style.label,
        classList: style.inputWidth,
        onChange: (e) =>
          nestedStateObjectSetter(
            "paymentPageState",
            "cardholderName",
            e.target.value.replace(/[^a-zA-Z\s-]/g, "")
          ),
        value: paymentPageState.cardholderName,
        isCard: false,
      },
      {
        id: "number",
        text: "Card Number",
        name: "number",
        labelClassList: style.label,
        classList: style.inputWidth,
        maxLength: OTHERCARDS.length,
        onChange: (e) => maskCreditCard(e),
        value: paymentPageState.cardNumber,
        onBlur: (e) => this.handleBlur(e.target.value, "card"),
        errorM: error.cardError,
        isCard: true,
        noMarginBottom:
          error.cardError && error.cardError.length > 0 && style.noMarginBottom,
      },
    ];

    const cvv = [
      {
        id: "cvv",
        text: "CVV",
        name: "cvv",
        labelClassList: style.label,
        classList: style.cvvInputWidth,
        maxLength: 3,
        shortDiv: style.shortDiv,
        onBlur: (e) => this.handleBlur(e.target.value, "securityCode"),
        errorM: error.securityCodeError,
        isCard: false,
      },
    ];

    const yearsArray = [];
    const currentYear = moment().year();
    for (let year = currentYear; year < currentYear + 10; year++) {
      yearsArray.push(year);
    }

    return (
      <div className={style.background}>
        <h2>Payment Information</h2>
        {this.mapInputBase(inputsArray)}
        <div className={style.expiry}>
          <Select
            htmlFor="Exp.Date"
            array={moment.months()}
            selected=" -Month"
            label={true}
          />
          <Select selected=" -Year" label={false} array={yearsArray} />
        </div>
        <div className={style.outerFlex}>
          <div className={style.cvvDiv}>
            {this.mapInputBase(cvv)}
            <FontAwesomeIcon
              className={style.questionMarkIcon}
              icon={faCircleQuestion}
              onMouseOver={() => this.setState({ cvvInfo: "displayBlock" })}
              onMouseOut={() => this.setState({ cvvInfo: "displayNone" })}
            />
          </div>
          <div
            className={`${style[this.state.cvvInfo]} ${style.cvvInfo}`}
          ></div>
        </div>

        <input
          className={style.buttons}
          type="button"
          onClick={() => this.props.nextPage("shipping")}
          value="back to shipping"
        />
        <input
          className={style.buttons}
          type="button"
          onClick={() => this.props.nextPage("confirmation")}
          value="next to confirmation"
        />
      </div>
    );
  }
}

export default Payment;
