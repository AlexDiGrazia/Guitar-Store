import React from "react";
import style from "./Select.module.css";
import { capitalize } from "../../JS/functions";

class Select extends React.Component {
  render() {
    const { htmlFor, array, selected, label, value, onChange, disabled } =
      this.props;
    return (
      <div>
        {label && (
          <label htmlFor={htmlFor} className={style.label}>
            {capitalize(htmlFor)}
          </label>
        )}
        <select
          name={htmlFor}
          id={htmlFor}
          className={style.select}
          value={value}
          onChange={onChange}
        >
          <option disabled={disabled} defaultValue>
            {selected}
          </option>
          {array.map((country) => (
            <option value={country}>{country}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default Select;
