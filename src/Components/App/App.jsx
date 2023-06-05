import React from "react";
import style from "./App.module.css";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import HomePage from "../HomePage/HomePage";
import Cart from "../Cart/Cart";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment"
import Confirmation from "../Confirmation/Confirmation";
import "../Main/index.css";


class App extends React.Component {
  state = { 
    currentPage: "home-page",
  };

  nextPage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage } = this.state;
    if (currentPage === "home-page") {
      return (
        <div>
          <HomePage nextPage={this.nextPage} />
        </div>
      );
    }
    if (currentPage === "cart") {
      return (
        <div>
          <Cart nextPage={this.nextPage} />
        </div>
      );
    }
    if (currentPage === "shipping") {
      return (
        <div>
          <Shipping nextPage={this.nextPage}/>
        </div>
      );
    }
    if (currentPage === "payment") {
      return (
        <div>
          <Payment nextPage={this.nextPage}/>
        </div>
      );
    }
    if (currentPage === "confirmation") {
      return (
        <div>
          <Confirmation nextPage={this.nextPage}/>
        </div>
      );
    }
  }
}

export default App;

