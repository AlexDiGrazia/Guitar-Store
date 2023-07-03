import React from "react";
import style from "./SignUp.module.css";
import InputBase from "../InputBase/InputBase";
import {
  throwErrorIfNameContainsNumbers,
  throwErrorIfZipCodeContainsLetters,
} from "../../JS/validations";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    zipCode: "",
    hiddenOrVisible: "password",
    eyeOpenOrClosed: "eye.png",
    error: {},
  };

  togglePasswordView = () => {
    const arg =
      this.state.eyeOpenOrClosed === "eye.png"
        ? ["text", "hidden.png"]
        : ["password", "eye.png"];
    this.setState({ hiddenOrVisible: arg[0], eyeOpenOrClosed: arg[1] });
  };

  handleValidations = (type) => {
    const { password, confirmPassword, firstName, lastName, zipCode } =
      this.state;
    const { userData } = this.props;

    let errorMessage = "";
    switch (type) {
      case "confirm-password":
        errorMessage =
          password === confirmPassword
            ? ""
            : "Password and Confirmation Password must match";

        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            confirmPassword: errorMessage,
          },
        }));
        break;
      case "first-name":
        errorMessage = throwErrorIfNameContainsNumbers(firstName);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            firstName: errorMessage,
          },
        }));
        break;
      case "last-name":
        errorMessage = throwErrorIfNameContainsNumbers(lastName);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            lastName: errorMessage,
          },
        }));
        break;
      case "zip-code":
        errorMessage = throwErrorIfZipCodeContainsLetters(zipCode);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zipCode: errorMessage,
          },
        }));
        break;
      case "email":
        errorMessage =
          userData.email === this.state.email
            ? "This email is already in use by an existing account"
            : "";
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            email: errorMessage,
          },
        }));
        break;
    }
  };

  handleBlur = ({ target: { name, value } }) =>
    this.handleValidations(name, value);

  render() {
    const { hiddenOrVisible, eyeOpenOrClosed, error } = this.state;

    const inputsArray = [
      {
        id: "username",
        text: "Username",
        placeholder: "Username",
        state: "username",
        type: "text",
        error: "username",
      },
      {
        id: "email",
        text: "email",
        placeholder: "Email",
        state: "email",
        type: "text",
        error: "email",
      },
      {
        id: "password",
        text: "Password",
        placeholder: "Password",
        state: "password",
        type: hiddenOrVisible,
        error: "password",
      },
      {
        id: "confirm-password",
        text: "Confirm Password",
        placeholder: "Confirm Password",
        state: "confirmPassword",
        type: hiddenOrVisible,
        error: "confirmPassword",
      },
      {
        id: "first-name",
        text: "First Name",
        placeholder: "First Name",
        state: "firstName",
        type: "text",
        error: "firstName",
      },
      {
        id: "last-name",
        text: "Last Name",
        placeholder: "Last Name",
        state: "lastName",
        type: "text",
        error: "lastName",
      },
      {
        id: "zip-code",
        text: "Zip Code",
        placeholder: "Zip Code",
        state: "zipCode",
        type: "text",
        error: "zipCode",
      },
    ];

    return (
      <div>
        {inputsArray.length
          ? inputsArray.map((obj) => (
              <div className={style.inputDiv} key={`sign-up ${obj.id}`}>
                <InputBase
                  id={obj.id}
                  type={obj.type}
                  classList={style.inputWidth}
                  text={obj.text}
                  name={obj.id}
                  value={obj.value}
                  placeholder={obj.placeholder}
                  onChange={(e) =>
                    this.setState({ [obj.state]: e.target.value })
                  }
                  onClick={obj.onClick}
                  onBlur={this.handleBlur}
                  errorM={
                    error && error[obj.error] && error[obj.error].length > 1
                      ? error[obj.error]
                      : null
                  }
                />
                {obj.id === "password" || obj.id === "confirm-password" ? (
                  <img
                    src={eyeOpenOrClosed}
                    alt="eye either open or close to reveal or hide password"
                    onClick={this.togglePasswordView}
                  />
                ) : null}
              </div>
            ))
          : null}

        {error.saveAccount && error.saveAccount.length && (
          <p className={style.error}>{error.saveAccount}</p>
        )}

        <input
          type="button"
          className={`${style.button} ${style.red}`}
          onClick={() => {
            let saveAccount = true;
            Object.values(error).forEach(
              (value) => (saveAccount = value.length ? false : saveAccount)
            );
            Object.values(this.state).forEach(
              (value) =>
                (saveAccount = value.length === 0 ? false : saveAccount)
            );
            let errorMessage = saveAccount
              ? ""
              : "Please correctly complete all fields";
            saveAccount
              ? this.props.nextPage("dashboard")
              : this.setState((prevState) => ({
                  error: {
                    ...prevState.error,
                    saveAccount: errorMessage,
                  },
                }));
          }}
          onBlur={() =>
            this.setState((prevState) => ({
              error: {
                ...prevState.error,
                saveAccount: "",
              },
            }))
          }
          value="SAVE"
        />
        <div>
          <span className={style.span}>
            <hr className={style.hr} />
            <p className={style.orParagraph}>or</p>
            <hr className={style.hr} />
          </span>
        </div>
        <input
          type="button"
          className={`${style.button} ${style.facebook}`}
          value="SIGN UP WITH FACEBOOK"
        />
      </div>
    );
  }
}

export default SignUp;
