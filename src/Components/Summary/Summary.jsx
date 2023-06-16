import React from "react";
import style from "./Summary.module.css";
import InputBase from "../InputBase/InputBase";
import InvoiceLine from "../InvoiceLine/InvoiceLine";
import { stateAbbreviations } from "../../JS/constants";
import { PHOTOS } from "../../Photos/photos";
import {
  formatPhoneNumber,
  formatToUSDCurrency,
  verifyAllFieldsComplete,
  verifyNoErrors,
  getLastFourOfCreditCard,
} from "../../JS/functions";
import {
  cardNumberValidation,
  findDebitCardType,
  securityCodeValidation,
  CARDICON,
} from "../../JS/creditCard";

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
      setHiddenOrRevealedState,
      setErrorMessage,
      checkAllFieldsValid,
      progressBarIconStateSetter,
      setDisplayScreen,
      cartItems,
      shippingPageState,
      cardType,
      paymentPageState,
      promoCode,
      error,
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
        {/* To Do// created shared array */}
        <h2 className={style.summary}>Summary</h2>
        {screenOnDisplay !== "bag" && (
          <p
            className={style.seeCartItems}
            style={
              true && 
              { 
              fontSize: "14px",
              textDecoration: "underline",
              marginBottom: screenOnDisplay === "confirmation" && '50px',
            }
          }
            
            onClick={() => setHiddenOrRevealedState("cartItems")}
          >
            See cart Items
          </p>
        )}
        <div 
          className={hiddenOrRevealed.cartItems}
          style={{marginBottom: hiddenOrRevealed.cartItems === '_reveal_1cnzb_92' && '35px'}}
          >
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

        <div className={style.cartInvoice}>
          {invoiceInfo.map((obj) => (
            <InvoiceLine name={obj.name} price={obj.price} />
          ))}
        </div>
        {screenOnDisplay === "payment" && (
          <div className={style.shipmentInfo}>
            <h5 onClick={() => setHiddenOrRevealedState("shipping")}>
              Shipment Address
            </h5>
            <div className={`${style.shipmentContainer}`}>
              <p>{shippingPageState.fullName}</p>
              <p>{shippingPageState.streetAddress}</p>
              <p>
                <span>{shippingPageState.city}</span>,{" "}
                <span>
                  {
                    stateAbbreviations[
                      shippingPageState.state.replace(/\s/g, "")
                    ]
                  }
                </span>{" "}
                <span>{shippingPageState.zipcode}</span>
              </p>
              <p>
                <span>{shippingPageState.cellPhoneAreaCode}</span>{" "}
                <span>
                  {formatPhoneNumber(shippingPageState.cellPhoneNumber)}
                </span>
              </p>
              <p>{shippingPageState.addressTitle}</p>
            </div>
          </div>
        )}

        {screenOnDisplay === "confirmation" && (
          // first one
          <>
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
                <h5 onClick={() => setHiddenOrRevealedState("shipping")}>
                  View Shipping Details{" "}
                </h5>
                <div
                  className={`${hiddenOrRevealed.shipping} ${style.shippingInfoContainer}`}
                >
                  <p>{shippingPageState.fullName}</p>
                  <p>{shippingPageState.streetAddress}</p>
                  <p>
                    <span>{shippingPageState.city}</span>,{" "}
                    <span>
                      {
                        stateAbbreviations[
                          shippingPageState.state.replace(/\s/g, "")
                        ]
                      }
                    </span>{" "}
                    <span>{shippingPageState.zipcode}</span>
                  </p>
                  <p>
                    <span>{shippingPageState.cellPhoneAreaCode}</span>{" "}
                    <span>
                      {formatPhoneNumber(shippingPageState.cellPhoneNumber)}
                    </span>
                  </p>
                  <p>{shippingPageState.addressTitle}</p>
                </div>
              </div>
            </div>
            {/* second one */}
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
                <h5 onClick={() => setHiddenOrRevealedState("payment")}>
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
              setDisplayScreen(buttonDirection[screenOnDisplay]["forward"]);
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
