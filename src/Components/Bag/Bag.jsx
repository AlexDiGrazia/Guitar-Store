import React from "react";
import style from "./Bag.module.css";
import { PHOTOS } from "../../Photos/photos";
import CartItem from "../CartItem/CartItem";
import { formatToUSDCurrency } from "../../JS/functions";

class Bag extends React.Component {
  render() {
    const { display, quantity, setQuantity, removeItem } = this.props;

    const itemsArray = [
      {
        photo: "LesPaul",
        alt: "Gibson Les Paul",
        headerSixText: "Gibson Les Paul",
        paraText: "Color: Cherry Burst",
        price: 3000,
        product: "guitar",
      },
      {
        photo: "Picks",
        alt: "Dunlop Guitar Picks",
        headerSixText: "Dunlop Guitar Picks",
        paraText: "Color: Assorted",
        price: 25,
        product: "picks",
      },
      {
        photo: "QuarterInchCable",
        alt: "Quarter Inch Cable",
        headerSixText: "Quarter Inch Guitar Cable",
        paraText: "Length: 6ft",
        price: 30,
        product: "cable",
      },
      {
        photo: "Wah",
        alt: "Ernie Ball Wah Pedal",
        headerSixText: "Ernie Ball",
        paraText: "Wah Pedal",
        price: 200,
        product: "wah",
      },
      {
        photo: "Marshall",
        alt: "Marshall Combo Amp",
        headerSixText: "Marshall",
        paraText: "JVM210C 100W Combo Amp",
        price: 3100,
        product: "marshall",
      },
    ];

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
