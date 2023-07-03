import React from "react";
import { PHOTOS } from "../../Photos/photos";
import CartItem from "../CartItem/CartItem";
import { formatToUSDCurrency } from "../../JS/functions";
import { itemsArray } from "../../JS/constants";

class Cart extends React.Component {
  render() {
    const {
      display,
      quantity,
      removeItem,
      nestedStateObjectSetter,
    } = this.props;

    return (
      <div>
        {itemsArray.map(
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
                cartItem={item.product}
                price={item.price}
                selectName="item-quantity"
                selectId="item-quantity"
                nestedStateObjectSetter={(e) =>
                  nestedStateObjectSetter(
                    "quantity",
                    item.product,
                    +e.target.value
                  )
                }
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

export default Cart;
