import React from "react";
import style from "./Summary.module.css";

class Summary extends React.Component {
  render() {
    return (
      <>
        {/* To Do// created shared array */}
        <h2 className={style.summary}>Summary</h2>
        {screenOnDisplay !== "bag" && (
          <p
            className={`${style.seeCartItems} ${
              screenOnDisplay === "confirmation" && style.marginBottom
            }`}
            onClick={() => {
              let display =
                hiddenOrRevealed.cartItems === style.hidden
                  ? style.reveal
                  : style.hidden;
              this.setState((prev) => ({
                hiddenOrRevealed: {
                  ...prev.hiddenOrRevealed,
                  cartItems: display,
                },
              }));
            }}
          >
            See cart Items
          </p>
        )}
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
            <h5
              onClick={() => {
                let display =
                  hiddenOrRevealed.shipping === style.hidden
                    ? style.reveal
                    : style.hidden;
                this.setState((prev) => ({
                  hiddenOrRevealed: {
                    ...prev.hiddenOrRevealed,
                    shipping: display,
                  },
                }));
              }}
            >
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
                <h5 onClick={() => this.setHiddenOrRevealedState("shipping")}>
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
                <h5 onClick={() => this.setHiddenOrRevealedState("payment")}>
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
              // this.setErrorMessage(screenOnDisplay);
              // this.checkAllFieldsValid(screenOnDisplay) &&
              //   verifyNoErrors(error) &&
              this.progressBarIconStateSetter(
                buttonDirection[screenOnDisplay]["forward"],
                screenOnDisplay,
                "forward"
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
      </>
    );
  }
}

export default Summary;
