import React from 'react';
import style from './Login.module.css'
import "../Main/index.css";
import InputBase from '../InputBase/InputBase';




class Login extends React.Component {
  state = {
    password: '',
    user: '',
    hiddenOrVisible: 'password',
    eyeOpenOrClosed: 'eye.png',
    errorMessage: '',
  }

  togglePasswordView = () => {
    const arg =  this.state.eyeOpenOrClosed === 'eye.png' 
      ? ['text', 'hidden.png']
      : ['password', 'eye.png'];
    this.setState({ hiddenOrVisible: arg[0], eyeOpenOrClosed: arg[1]})
  }
 
  render() {
    const { password, errorMessage, hiddenOrVisible, eyeOpenOrClosed, user } = this.state;
    const { userData } = this.props;

    return(
      <div>
        <p className={style.errorMessage}>{errorMessage}</p>
        <InputBase 
          id="username"
          text="Username or email"
          classList={style.inputWidth}
          placeholder="Username or email"
          onChange={(e) => this.setState({ user: e.target.value})}
        />
        <div className={style.password}>
          <InputBase 
            id="password"
            text="Password"
            classList={style.inputWidth}
            placeholder="Password"
            name="password"
            onChange={(e) => this.setState({ password: e.target.value})}
            type={hiddenOrVisible}
          />
          <img 
            src={eyeOpenOrClosed} 
            alt="eye with slash icon" 
            onClick={this.togglePasswordView}
            />
        </div>
        <input 
          type="button"
          className={style.button}
          onClick={() => {
            // password === userData.password &&
            // user === userData.username || user === userData.email
            true
              ? this.props.nextPage('cart')
              : this.setState(
                user !== '' && password !==''
                ? { errorMessage: 'Username/email and Password do not match.' }
                : { errorMessage: 'Please submit BOTH Username/email and Password'}
                )
          }} 
          value="Login"
          />
       
  
      </div>
    )
  }
}

export default Login