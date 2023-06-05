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