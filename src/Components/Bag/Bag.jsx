import React from "react";
import style from "./Bag.module.css";
import { PHOTOS } from "../../Photos/photos";
import CartItem from "../CartItem/CartItem";
import { formatToUSDCurrency } from "../../JS/functions";

class Bag extends React.Component {
  render() {
    const { display, quantity, setQuantity, removeItem, setCartItemsState, cartItems, } = this.props;

    return (
      <div>
        {cartItems.map(
          (item) =>
            display[item.product] === "visible" && (
              <CartItem
                key={`key-${item.product}`}
                src={PHOTOS[item.photo]}
                alt={item.alt}
                description={
                  <div>
                    <h6>{item.headerSixText}</h6>
                    <p>{item.paraText}</p>
                    <p>{formatToUSDCurrency(item.price)}</p>
                  </div>
                }
                setCartItemsState={setCartItemsState}
                cartItem={item.product}
                price={item.price}
                selectName="item-quantity"
                selectId="item-quantity"
                selectorOnChange={(e) => setQuantity(e, item.product)}
                quantity={quantity[item.product]}
                removeItem={() => removeItem(item.product)}
                setErrorMessage={() => this.setErrorMessage()}
              />
            )
        )}
      </div>
    );
  }
}

export default Bag;
