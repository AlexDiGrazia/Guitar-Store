import React from 'react';
import style from './Confirmation.module.css'


class Confirmation extends React.Component {
  
  render() {
    return(
      <div className={style.brown}>
        <input 
          type="button"
          onClick={() => this.props.nextPage('payment')} 
          value="back to Payment"/>
          confirmation
      </div>
    )
  }
}

export default Confirmation