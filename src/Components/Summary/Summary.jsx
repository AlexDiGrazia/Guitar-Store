import React from "react";
import style from "./Summary.module.css";
import InputBase from "../InputBase/InputBase";
import InvoiceLine from "../InvoiceLine/InvoiceLine";
import ShippingSummaryInfo from "../ShippingSummaryInfo/ShippingSummaryInfo";
import { PHOTOS } from "../../Photos/photos";
import { CARDICON } from "../../JS/creditCard";
import {
  formatToUSDCurrency,
  verifyNoErrors,
  getLastFourOfCreditCard,
} from "../../JS/functions";

class Summary extends React.Component {
  render() {
    const {
      screenOnDisplay,
      hiddenOrRevealed,
      quantity,
      price,
      discountPercentage,
      shippingOption,
      buttonDirection,
      allFieldsValidError,
      handleState,
      nestedStateObjectSetter,
      setErrorMessage,
      checkAllFieldsValid,
      progressBarIconStateSetter,
      cartItems,
      shippingPageState,
      cardType,
      paymentPageState,
      promoCode,
      error,
      setHiddenOrRevealed,
    } = this.props;

    const promoInputs = [
      {
        id: "promo",
        type: "text",
        name: "promo",
        placeholder: "Code",
        classList: style.promoCodeInput,
        onChange: (e) => handleState("promoCode", e.target.value),
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
          handleState("discountPercentage", percent);
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
        price: `${Object.values(this.props.quantity).reduce(
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

    return (
      <>
        <h2 className={style.summary}>Summary</h2>

        {/* Prompt to Reveal Cart items */}
        {screenOnDisplay !== "bag" && (
          <p
            className={style.seeCartItems}
            style={{
              fontSize: "14px",
              textDecoration: "underline",
              marginBottom: screenOnDisplay === "confirmation" && "50px",
            }}
            onClick={() => {
              nestedStateObjectSetter(
                "hiddenOrRevealed",
                "cartItems",
                setHiddenOrRevealed("cartItems")
              );
            }}
          >
            See cart Items
          </p>
        )}

        {/* Cart-Items container that appears if user clicks prompt */}
        <div className={hiddenOrRevealed.cartItems}>
          {screenOnDisplay !== "bag" &&
            cartItems.map((item) => (
              <div className={style.productWrapper}>
                <div className={style.summaryImgWrapper}>
                  <img
                    src={PHOTOS[item.photo]}
                    alt={item.alt}
                    className={style.summaryPhotos}
                  />
                </div>
                <div className={style.productText}>
                  <h6>{item.headerSixText}</h6>
                  <p>{item.paraText}</p>
                  <div className={style.qtyAndPriceFlexContainer}>
                    <p>{`Qty: ${quantity[item.product]}`}</p>
                    <p>
                      {formatToUSDCurrency(quantity[item.product] * item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Promo prompt and Input field*/}
        {screenOnDisplay !== "confirmation" && (
          <>
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
          </>
        )}

        {/* Cart Totals: $$ */}
        <div className={style.cartInvoice}>
          {invoiceInfo.map((obj) => (
            <InvoiceLine name={obj.name} price={obj.price} />
          ))}
        </div>

        {/* Shipping Info when on Payment Page*/}
        {screenOnDisplay === "payment" && (
          <div className={style.shipmentInfo}>
            <h5
              onClick={() => {
                nestedStateObjectSetter(
                  "hiddenOrRevealed",
                  "shipping",
                  setHiddenOrRevealed("shipping")
                );
              }}
            >
              Shipment Address
            </h5>
            <div className={`${style.shipmentContainer}`}>
              <ShippingSummaryInfo shippingPageState={shippingPageState} />
            </div>
          </div>
        )}

        {/* Summary of Shipping & Payment on Final Confirmation page*/}
        {screenOnDisplay === "confirmation" && (
          <>
            {/* Shipping */}
            <div className={style.flexRow}>
              <div className={style.shippingMethod}>
                <h6>SHIPPING</h6>
                <div className={style.summaryContainer}>
                  <h6>{shippingOption === "free" ? "Standard" : "Express"}</h6>
                  <p>
                    {"  "}
                    Delivery in {shippingOption === "free"
                      ? "4 - 6"
                      : "1 - 3"}{" "}
                    Business Days
                  </p>
                </div>
              </div>
              <div className={style.shippingSummary}>
                <h5
                  onClick={() => {
                    nestedStateObjectSetter(
                      "hiddenOrRevealed",
                      "shipping",
                      setHiddenOrRevealed("shipping")
                    );
                  }}
                >
                  View Shipping Details{" "}
                </h5>
                <div
                  className={`${hiddenOrRevealed.shipping} ${style.shippingInfoContainer}`}
                >
                  <ShippingSummaryInfo shippingPageState={shippingPageState} />
                </div>
              </div>
            </div>
            {/* Payment */}
            <div className={style.flexRow}>
              <div className={style.shippingMethod}>
                <h6>PAYMENT</h6>
                <div className={style.cardInfoWrapper}>
                  <h6 className={style.cardHeaderSix}>
                    {
                      <>
                        <img
                          className={style.creditCardIcon}
                          src={CARDICON[cardType]}
                          alt="card"
                        ></img>
                        {cardType}
                      </>
                    }
                  </h6>
                  <p>Total Payment: {formatToUSDCurrency(total)}</p>
                </div>
              </div>
              <div className={style.shippingSummary}>
                <h5
                  onClick={() => {
                    nestedStateObjectSetter(
                      "hiddenOrRevealed",
                      "payment",
                      setHiddenOrRevealed("payment")
                    );
                  }}
                >
                  View Payment Details{" "}
                </h5>
                <div
                  className={`${hiddenOrRevealed.payment} ${style.shippingInfoContainer}`}
                >
                  <div>
                    xxxx-xxxx-xxxx-
                    {getLastFourOfCreditCard(paymentPageState.cardNumber)}
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        )}

        {/* Checkout Button */}
        {screenOnDisplay !== "confirmation" && (
          <input
            className={style.nextShipping}
            name="checkout"
            type="button"
            onClick={() => {
              // setErrorMessage(screenOnDisplay);
              // checkAllFieldsValid(screenOnDisplay) &&
              //   verifyNoErrors(error) &&
              progressBarIconStateSetter(
                buttonDirection[screenOnDisplay]["forward"],
                screenOnDisplay,
                "forward"
              );
              handleState(
                "screenOnDisplay",
                buttonDirection[screenOnDisplay]["forward"]
              );
            }}
            onBlur={() => handleState("allFieldsValidError", "")}
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
      </>
    );
  }
}

export default Summary;
