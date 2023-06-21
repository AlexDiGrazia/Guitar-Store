import React from "react";
import { formatPhoneNumber } from "../../JS/functions";
import { stateAbbreviations } from "../../JS/constants";

class ShippingSummaryInfo extends React.Component {
  render() {
    const { shippingPageState } = this.props;
    return (
      <>
        <p>{shippingPageState.fullName}</p>
        <p>{shippingPageState.streetAddress}</p>
        <p>
          <span>{shippingPageState.city}</span>,{" "}
          <span>
            {stateAbbreviations[shippingPageState.state.replace(/\s/g, "")]}
          </span>{" "}
          <span>{shippingPageState.zipcode}</span>
        </p>
        <p>
          <span>{`(${shippingPageState.cellPhoneAreaCode})`}</span>{" "}
          <span>{shippingPageState.cellPhoneNumber}</span>
        </p>
        <p>{shippingPageState.addressTitle}</p>
      </>
    );
  }
}

export default ShippingSummaryInfo;
