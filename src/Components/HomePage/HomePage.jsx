import React from "react";
import style from "./HomePage.module.css";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

class HomePage extends React.Component {
  state = {
    homePageState: "login",
  };

  render() {
    const userData = {
      username: "Alex DiGrazia",
      email: "alexdigrazia@gmail.com",
      password: "iluvdogs<3",
    };

    const { homePageState } = this.state;
    const { nextPage } = this.props;
    const radioButtonsArray = [
      {
        button: "login",
        text: "Login",
        page: "login",
        group: "select-login-or-create-account",
        id: "login",
        bool: "login",
      },
      {
        button: "create-account",
        text: "Create Account",
        page: "create-account",
        group: "select-login-or-create-account",
        id: "create-account",
        bool: "signup",
      },
    ];

    return (
      <div className={style.container}>
        <div className={style.radioButtons}>
          {radioButtonsArray.map((obj) => (
            <div key={obj.id}>
              <label htmlFor={obj.button}>{obj.text}</label>
              <input
                onChange={() => this.setState({ homePageState: obj.bool })}
                name="select-login-or-create-account"
                id={obj.id}
                type="radio"
              ></input>
            </div>
          ))}
        </div>

        {this.state.homePageState === "login" ? (
          <Login nextPage={nextPage} userData={userData} />
        ) : (
          <SignUp nextPage={nextPage} userData={userData}/>
        )}
      </div>
    );
  }
}

export default HomePage;