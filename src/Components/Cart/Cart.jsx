import React from "react";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import { PHOTOS } from "../../Photos/photos";
import {
  formatPhoneNumber,
  formatToUSDCurrency,
  verifyAllFieldsComplete,
  verifyNoErrors,
} from "../../JS/functions";
import {
  cardNumberValidation,
  findDebitCardType,
  securityCodeValidation,
} from "../../JS/creditCard";
import InputBase from "../InputBase/InputBase";
import InvoiceLine from "../InvoiceLine/InvoiceLine";
import Bag from "../Bag/Bag";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTruck,
  faCreditCard,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
// import { faCircleCheck as emptyCircleCheck } from "@fortawesome/free-regular-svg-icons";
// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(emptyCircleCheck);

class Cart extends React.Component {
  state = {
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
    buttonDirection: {
      bag: {
        next: "CHECKOUT",
        back: "BACK TO HOME",
        forward: "shipping",
      },
      shipping: {
        next: "CHECKOUT",
        back: "BACK TO CART",
        forward: "payment",
        backward: "bag",
      },
      payment: {
        next: null,
        back: "BACK TO SHIPPING",
        forward: "confirmation",
        backward: "shipping",
      },
      confirmation: {
        next: "all done",
        back: "BACK TO PAYMENT",
        forward: null,
        backward: "payment",
      },
    },
    totalCartPrice: "$5,000",
    shippingPageState: {
      addressTitle: "",
      fullName: "",
      streetAddress: "",
      streetAddress: "",
      zipcode: "",
      cellPhoneAreaCode: "",
      cellPhoneNumber: "",
      teleAreaCode: "",
      telephoneNumber: "",
      country: "",
      state: "",
      city: "",
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
        icon: faCheck,
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
  };

  progressBarIconStateSetter = (page, bar) => {
    const { progressBarIcons } = this.state;
    const icons = {
      bag: faCheck,
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
      progressBarIcons[page]["icon"] !== faCheck ? faCheck : icons[page];
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
          icon: fontAwesomeIcon,
        },
        [bar]: {
          ...prev.progressBarIcons[bar],
          hr: hrColor,
        },
      },
    }));
  };

  handleState = (key, value) => {
    this.setState({ [key]: value });
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

  nestedStateObjectSetter = (object, key, value) => {
    this.setState((prev) => ({
      [object]: {
        ...prev[object],
        [key]: value,
      },
    }));
  };

  handleShippingState = (key, value) => {
    this.setState((prev) => ({
      shippingPageState: {
        ...prev.shippingPageState,
        [key]: value,
      },
    }));
  };

  ensureNumbers = (e, state) => {
    Number.isInteger(+e.target.value)
      ? this.setState((prev) => ({
          shippingPageState: {
            ...prev.shippingPageState,
            [state]: e.target.value.replace(/\s/g, ""),
          },
        }))
      : null;
  };

  phoneNumberStateSetter = (e, state) => {
    let mask = e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "");
    if (mask.length) {
      mask = formatPhoneNumber(mask);
    }
    this.setState((prev) => ({
      shippingPageState: {
        ...prev.shippingPageState,
        [state]: mask,
      },
    }));
  };

  maskCreditCard = (e) => {
    let mask = e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "");
    if (mask.length) {
      mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
      this.setState((prev) => ({
        paymentPageState: {
          ...prev.paymentPageState,
          cardNumber: mask,
        },
      }));
    } else {
      this.setState((prev) => ({
        paymentPageState: {
          ...prev.paymentPageState,
          cardNumber: "",
        },
      }));
    }
  };

  setDisplayScreen = (component) => {
    this.setState({ screenOnDisplay: component });
  };

  setQuantity = (e, product) => {
    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [product]: +e.target.value,
      },
    }));
  };

  removeItem = (product) => {
    this.setState({
      display: {
        ...this.state.display,
        [product]: "none",
      },
      quantity: {
        ...this.state.quantity,
        [product]: 0,
      },
    });
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
      quantity,
      display,
      price,
      allFieldsValidError,
      discountPercentage,
      promoCode,
      screenOnDisplay,
      shippingOption,
      buttonDirection,
      shippingPageState,
      paymentPageState,
      error,
      cardType,
      cvvInfo,
      progressBarIcons,
    } = this.state;

    const { nextPage } = this.props;

    const promoInputs = [
      {
        id: "promo",
        type: "text",
        name: "promo",
        placeholder: "Code",
        classList: style.promoCodeInput,
        onChange: (e) => this.setState({ promoCode: e.target.value }),
      },
      {
        id: "applyPromo",
        type: "button",
        name: "applyPromo",
        value: "APPLY",
        placeholder: null,
        classList: style.applyPromoButton,
        onClick: () => {
          const percent = promoCode === "TWENTY" && 0.2;
          this.setState({ discountPercentage: percent });
        },
      },
    ];

    const subTotal = Object.entries(quantity).reduce((total, [key, value]) => {
      return total + value * price[key];
    }, 0);

    const discount = discountPercentage ? subTotal * discountPercentage : "-";

    const freeOrExpressShipping = shippingOption === "free" ? 0 : 5;
    const total =
      (Number.isInteger(discount) ? subTotal - discount : subTotal) +
      freeOrExpressShipping;

    const invoiceInfo = [
      {
        name: "Cart:",
        price: `${Object.values(this.state.quantity).reduce(
          (a, b) => a + b
        )} items`,
      },
      {
        name: "Subtotal:",
        price: formatToUSDCurrency(subTotal),
      },
      {
        name: "Shipping & Handling:",
        price:
          shippingOption === "$5.00"
            ? formatToUSDCurrency(freeOrExpressShipping)
            : "-",
      },
      {
        name: "Discount:",
        price: formatToUSDCurrency(discount),
      },
      {
        name: "Total:",
        price: formatToUSDCurrency(total),
      },
    ];

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

    const componentsObject = {
      bag: (
        <Bag
          display={display}
          quantity={quantity}
          setQuantity={(e, product) => this.setQuantity(e, product)}
          removeItem={(product) => this.removeItem(product)}
        />
      ),
      shipping: (
        <Shipping
          setDisplayScreen={(component) => this.setDisplayScreen(component)}
          handleState={this.handleState}
          handleShippingState={this.handleShippingState}
          ensureNumbers={this.ensureNumbers}
          shippingPageState={shippingPageState}
          phoneNumberStateSetter={this.phoneNumberStateSetter}
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
        {screenOnDisplay !== "confirmation" && (
          <input
            className={style.returnHome}
            type="button"
            onClick={() => {
              if (screenOnDisplay === "bag") {
                nextPage("home-page");
              } else {
                this.progressBarIconStateSetter(
                  screenOnDisplay,
                  buttonDirection[screenOnDisplay]["backward"]
                );
                this.setDisplayScreen(
                  buttonDirection[screenOnDisplay]["backward"]
                );
              }
            }}
            value={buttonDirection[screenOnDisplay]["back"]}
          />
        )}
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
                  className={`${style.hr} ${
                    progressBarIcons[icon.value]["hr"]
                  }`}
                />
              )}
            </>
          ))}
        </div>
        <div className={style.flexContainer}>
          <div className={style.left}>{componentsObject[screenOnDisplay]}</div>
          <div className={style.right}>
            <h2 className={style.summary}>Summary</h2>

            <h5 className={style.promoPrompt}>Do you have a Promo Code?</h5>
            <div className={style.promoContainer}>
              {promoInputs.map((obj) => (
                <InputBase
                  id={obj.id}
                  type={obj.type}
                  name={obj.name}
                  value={obj.value}
                  placeholder={obj.placeholder}
                  classList={obj.classList}
                  onClick={obj.onClick}
                  onChange={obj.onChange}
                />
              ))}
            </div>
            <div className={style.cartInvoice}>
              {invoiceInfo.map((obj) => (
                <InvoiceLine name={obj.name} price={obj.price} />
              ))}
            </div>

            {screenOnDisplay !== "confirmation" && (
              <input
                className={style.nextShipping}
                name="checkout"
                type="button"
                onClick={() => {
                  // this.setErrorMessage(screenOnDisplay);
                  // this.checkAllFieldsValid(screenOnDisplay) &&
                  //   verifyNoErrors(error) &&
                  this.progressBarIconStateSetter(
                    buttonDirection[screenOnDisplay]["forward"],
                    screenOnDisplay
                  );
                  this.setDisplayScreen(
                    buttonDirection[screenOnDisplay]["forward"]
                  );
                }}
                onBlur={() => this.setState({ allFieldsValidError: "" })}
                value={
                  screenOnDisplay === "payment"
                    ? `PAY  ${formatToUSDCurrency(total)}`
                    : buttonDirection[screenOnDisplay]["next"]
                }
              />
            )}
            <br />
            <label className={style.errorMessage} htmlFor="checkout">
              {allFieldsValidError}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
