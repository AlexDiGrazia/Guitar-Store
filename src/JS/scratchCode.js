// this.state.password !== this.state.confirmPassword
// && !this.state.error.confirmPassword.length
// && this.setState((prevState) => ({ error: {
//   ...prevState.error,
//   confirmPassword: 'Password and Confirmation Password must match',
// }}))

// this.state.error.confirmPassword 
// && this.state.password === this.state.confirmPassword
// && this.setState((prevState) => ({ error: {
//   ...prevState.error,
//   confirmPassword: '',
// }}))


// const passwordsMatch =  this.state.password === this.state.confirmPassword
//         const isErrorMessagePresent = 
//           this.state.error.confirmPassword
//           &&  this.state.error.confirmPassword.length

//         if (passwordsMatch) {
//           isErrorMessagePresent
//           ? this.setState((prevState) => ({ error: {
//             ...prevState.error,
//             confirmPassword: '',
//           }})) : null;
//         } else {
//           isErrorMessagePresent
//           ? null 
//           : this.setState((prevState) => ({ error: {
//             ...prevState.error,
//             confirmPassword: 'Password and Confirmation Password must match',
//           }}));
//         }

// setCartItemsState = (cartItem) => {
//   itemsArray.splice(
//     itemsArray.findIndex((obj) => obj.product === cartItem),
//     1
//   );
//   this.setState({
//     cartItems: itemsArray,
//     display: {
//       ...this.state.display,
//       [cartItem]: "none",
//     },
//     quantity: {
//       ...this.state.quantity,
//       [cartItem]: 0,
//     },
//   });
// };

  // mapPhoneInputs = (array) => {
  //   return array.map((obj) => (
  //     <div className={style.flex}>{obj.map((item) => mapInputBase(item))}</div>
  //   ));
  // };
