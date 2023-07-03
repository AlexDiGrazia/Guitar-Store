import React from "react";
import style from "./App.module.css";
import HomePage from "../HomePage/HomePage";
import Dashboard from "../Dashboard/Dashboard";
import "../Main/index.css";

class App extends React.Component {
  state = {
    currentPage: "homePage",
  };

  nextPage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const componentsObject = {
      homePage: <HomePage nextPage={this.nextPage} />,
      dashboard: <Dashboard nextPage={this.nextPage} />,
    };

    return <div>{componentsObject[this.state.currentPage]}</div>;
  }
}

export default App;
