import React from "react";
import style from "./InvoiceLine.module.css"

class InvoiceLine extends React.Component {
  render() {
    const { name, price } = this.props;
    return(
      <div className={style.lineItem}>
        <p>{name}</p>
        <p>{price}</p>
      </div>
    )
  }
}

export default InvoiceLine;