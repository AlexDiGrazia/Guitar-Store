import React from "react";
import style from "./Payment.module.css";
import InputBase from "../InputBase/InputBase";
import Select from "../Select/Select";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { OTHERCARDS, CARD, CARDICON } from "../../JS/creditCard";

class Payment extends React.Component {
  mapInputBase = (array) => {
    const { error, cardType } = this.props;

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
        {(!error || !error.cardError) &&
          obj.isCard &&
          CARD.includes(cardType) && (
            <img
              className={style.creditCardIcon}
              src={CARDICON[cardType]}
              alt="card"
            ></img>
          )}
      </div>
    ));
  };

  showInfo = {};
  render() {
    const {
      maskCreditCard,
      paymentPageState,
      nestedStateObjectSetter,
      handleBlur,
      error,
      cvvInfo,
      handleState,
    } = this.props;

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
        onBlur: (e) => handleBlur(e.target.value, "card"),
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
        value: paymentPageState.cvv,
        labelClassList: style.label,
        classList: style.cvvInputWidth,
        maxLength: 3,
        shortDiv: style.shortDiv,
        onBlur: (e) => handleBlur(e.target.value, "securityCode"),
        errorM: error.securityCodeError,
        isCard: false,
        onChange: (e) =>
          nestedStateObjectSetter("paymentPageState", "cvv", e.target.value),
      },
    ];

    const yearsArray = [];
    const currentYear = moment().year();
    for (let year = currentYear; year < currentYear + 10; year++) {
      yearsArray.push(year);
    }

    const selectArray = [
      {
        htmlFor: "Exp.Date",
        array: moment.months(),
        selected: " -Month",
        label: true,
        onChange: (e) =>
          nestedStateObjectSetter(
            "paymentPageState",
            "expirationMonth",
            e.target.value
          ),
        value: "expirationMonth",
      },
      {
        htmlFor: "Exp.Date",
        array: yearsArray,
        selected: " -Year",
        label: false,
        onChange: (e) =>
          nestedStateObjectSetter(
            "paymentPageState",
            "expirationYear",
            e.target.value
          ),
        value: "expirationYear",
      },
    ];

    return (
      <div className={style.background}>
        <h2>Payment Information</h2>
        {this.mapInputBase(inputsArray)}
        <div className={style.expiry}>
          {selectArray.map((obj) => (
            <Select
              htmlFor={obj.htmlFor}
              array={obj.array}
              selected={obj.selected}
              label={obj.label}
              onChange={obj.onChange}
              disabled={paymentPageState[obj.value]}
            />
          ))}
        </div>
        <div className={style.outerFlex}>
          <div className={style.cvvDiv}>
            {this.mapInputBase(cvv)}
            <FontAwesomeIcon
              className={style.questionMarkIcon}
              icon={faCircleQuestion}
              onMouseOver={() => handleState("cvvInfo", "displayBlock")}
              onMouseOut={() => handleState("cvvInfo", "displayNone")}
            />
          </div>
          <div className={`${style[cvvInfo]} ${style.cvvInfo}`}></div>
        </div>
      </div>
    );
  }
}

export default Payment;
