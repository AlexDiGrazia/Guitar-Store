import React from "react";
import style from "./Cart.module.css";
import { itemsArray } from "../../JS/constants";
import Bag from "../Bag/Bag";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import ProgressBar from "../ProgressBar/ProgressBar";
import Summary from "../Summary/Summary";
import { buttonDirection } from "../../JS/constants";
import {
  faCheck,
  faTruck,
  faCreditCard,
  faThumbsUp,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import {
  formatPhoneNumber,
  verifyAllFieldsComplete,
  verifyNoErrors,
} from "../../JS/functions";
import {
  cardNumberValidation,
  findDebitCardType,
  securityCodeValidation,
  CARDICON,
} from "../../JS/creditCard";

class Cart extends React.Component {
  state = {
    cartItems: itemsArray,
    quantity: {
      guitar: 1,
      picks: 1,
      cable: 1,
      wah: 1,
      marshall: 1,
    },
    display: {
      guitar: "visible",
      picks: "visible",
      cable: "visible",
      wah: "visible",
      marshall: "visible",
    },
    price: {
      guitar: 3000,
      picks: 25,
      cable: 30,
      wah: 200,
      marshall: 3100,
    },
    allFieldsValidError: "",
    discountPercentage: "",
    promoCode: "",
    screenOnDisplay: "bag",
    shippingOption: "free",
    totalCartPrice: "$5,000",
    shippingPageState: {
      addressTitle: "residential",
      fullName: "John Doe",
      streetAddress: "57335 Seneca Valley Rd.",
      zipcode: "32577",
      cellPhoneAreaCode: "935",
      cellPhoneNumber: "785 - 2334",
      teleAreaCode: "",
      telephoneNumber: "",
      country: "USA",
      state: "Rhode Island",
      city: "Arberita",
    },
    paymentPageState: {
      cardholderName: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
    },
    error: {},
    cvvInfo: "displayNone",
    cardType: "",
    progressBarIcons: {
      bag: {
        innerColor: style.white,
        circle: style.red,
        icon: faCartShopping,
        hr: style.lightGrey,
      },
      shipping: {
        innerColor: style.darkGrey,
        circle: style.grey,
        icon: faTruck,
        hr: style.lightGrey,
      },
      payment: {
        innerColor: style.darkGrey,
        circle: style.grey,
        icon: faCreditCard,
        hr: style.lightGrey,
      },
      confirmation: {
        innerColor: style.darkGrey,
        circle: style.grey,
        icon: faThumbsUp,
        hr: style.lightGrey,
      },
    },
    hiddenOrRevealed: {
      cartItems: style.hidden,
      shipping: style.hidden,
      payment: style.hidden,
    },
  };

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  nestedStateObjectSetter = (object, key, value) => {
    this.setState((prev) => ({
      [object]: {
        ...prev[object],
        [key]: value,
      },
    }));
  };

  setHiddenOrRevealedState = (key) => {
    const { hiddenOrRevealed } = this.state;
    let display = hiddenOrRevealed[key] === style.hidden 
      ? style.reveal 
      : style.hidden;
    this.nestedStateObjectSetter("hiddenOrRevealed", key, display);
  };

  maskCreditCard = (e) => {
    let string = e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "");
    let mask = string.length
      ? string.match(new RegExp(".{1,4}", "g")).join(" ")
      : "";
    this.nestedStateObjectSetter("paymentPageState", "cardNumber", mask);
  };

  setCartItemsState = (cartItem) => {
    itemsArray.splice(
      itemsArray.findIndex((obj) => obj.product === cartItem),
      1
    );
    this.setState({
      cartItems: itemsArray,
      display: {
        ...this.state.display,
        [cartItem]: "none",
      },
      quantity: {
        ...this.state.quantity,
        [cartItem]: 0,
      },
    });
  };

  progressBarIconStateSetter = (page, bar, direction) => {
    const { progressBarIcons, screenOnDisplay } = this.state;
    const icons = {
      bag: faCartShopping,
      shipping: faTruck,
      payment: faCreditCard,
      confirmation: faThumbsUp,
    };
    let iconColor =
      progressBarIcons[page]["innerColor"] === style.darkGrey
        ? style.white
        : style.darkGrey;
    let circleColor =
      progressBarIcons[page]["circle"] === style.grey ? style.red : style.grey;
    let fontAwesomeIcon =
      direction === "backwards"
        ? icons[bar]
        : progressBarIcons[page]["icon"] !== faCheck
        ? faCheck
        : icons[page];

    let hrColor =
      progressBarIcons[bar]["hr"] === style.lightGrey
        ? style.red
        : style.lightGrey;
    this.setState((prev) => ({
      progressBarIcons: {
        ...prev.progressBarIcons,
        [page]: {
          ...prev.progressBarIcons[page],
          innerColor: iconColor,
          circle: circleColor,
        },
        [bar]: {
          ...prev.progressBarIcons[bar],
          hr: hrColor,
          icon: fontAwesomeIcon,
        },
      },
    }));
  };

  handleBlur = (value, type) => {
    let errorText;
    switch (type) {
      case "card":
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: findDebitCardType(value),
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

  getCartTotal = () => {
    return Object.values(this.state.quantity).reduce((a, b) => a + b);
  };

  setErrorMessage = (type) => {
    const { paymentPageState, error } = this.state;
    let errorMessage;
    switch (type) {
      case "bag":
        errorMessage = this.getCartTotal() === 0 && "No items in cart";
        break;
      case "shipping":
        let allFieldsComplete = true;
        Object.values(this.state.shippingPageState).forEach(
          (value) =>
            (allFieldsComplete = value.length === 0 ? false : allFieldsComplete)
        );
        errorMessage = allFieldsComplete ? "" : "Please complete all fields";
        break;
      case "payment":
        errorMessage =
          verifyAllFieldsComplete(paymentPageState) && verifyNoErrors(error)
            ? ""
            : "Please complete all fields";
    }
    this.setState({ allFieldsValidError: errorMessage });
  };

  checkAllFieldsValid = (type) => {
    const { paymentPageState } = this.state;
    switch (type) {
      case "bag":
        return this.getCartTotal() > 0;
      case "shipping":
        let allFieldsComplete = true;
        // Object.values(this.state.shippingPageState).forEach(
        //   (value) =>
        //     (allFieldsComplete = value.length === 0 ? false : allFieldsComplete)
        // );
        return allFieldsComplete;
      case "payment":
        return verifyAllFieldsComplete(paymentPageState);
        break;
    }
  };

  render() {
    const {
      cartItems,
      quantity,
      display,
      price,
      allFieldsValidError,
      discountPercentage,
      promoCode,
      screenOnDisplay,
      shippingOption,
      shippingPageState,
      paymentPageState,
      error,
      cardType,
      cvvInfo,
      progressBarIcons,
      hiddenOrRevealed,
    } = this.state;

    const { nextPage } = this.props;

    const componentsObject = {
      bag: (
        <Bag
          cartItems={cartItems}
          display={display}
          quantity={quantity}
          removeItem={(product) => this.removeItem(product)}
          setCartItemsState={this.setCartItemsState}
          nestedStateObjectSetter={this.nestedStateObjectSetter}
        />
      ),
      shipping: (
        <Shipping
          handleState={this.handleState}
          nestedStateObjectSetter={this.nestedStateObjectSetter}
          shippingPageState={shippingPageState}
        />
      ),
      payment: (
        <Payment
          maskCreditCard={this.maskCreditCard}
          paymentPageState={paymentPageState}
          nestedStateObjectSetter={this.nestedStateObjectSetter}
          handleBlur={this.handleBlur}
          error={error}
          cardType={cardType}
          cvvInfo={cvvInfo}
          handleState={this.handleState}
        />
      ),
      confirmation: <Confirmation nextPage={nextPage} />,
    };

    return (
      <div className={style.cart}>
        {
          <input
            className={style.returnHome}
            type="button"
            onClick={() => {
              if (screenOnDisplay === "bag") {
                nextPage("homePage");
              } else {
                this.progressBarIconStateSetter(
                  screenOnDisplay,
                  buttonDirection[screenOnDisplay]["backward"],
                  "backwards"
                );
                this.handleState(
                  "screenOnDisplay",
                  buttonDirection[screenOnDisplay]["backward"]
                );
              }
            }}
            value={buttonDirection[screenOnDisplay]["back"]}
          />
        }
        <ProgressBar progressBarIcons={progressBarIcons} />
        <div className={style.flexContainer}>
          <div className={style.left}>{componentsObject[screenOnDisplay]}</div>
          <div className={style.right}>
            <Summary
              screenOnDisplay={screenOnDisplay}
              hiddenOrRevealed={hiddenOrRevealed}
              quantity={quantity}
              price={price}
              discountPercentage={discountPercentage}
              shippingOption={shippingOption}
              buttonDirection={buttonDirection}
              allFieldsValidError={allFieldsValidError}
              handleState={this.handleState}
              setErrorMessage={this.setErrorMessage}
              checkAllFieldsValid={this.checkAllFieldsValid}
              progressBarIconStateSetter={this.progressBarIconStateSetter}
              cartItems={cartItems}
              shippingPageState={shippingPageState}
              cardType={cardType}
              paymentPageState={paymentPageState}
              promoCode={promoCode}
              error={error}
              setHiddenOrRevealedState={this.setHiddenOrRevealedState}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
