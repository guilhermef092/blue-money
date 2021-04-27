import React from 'react';

import './styles.css';



const Select = ({ name, label, options, ...rest }) => {
  return (
    <div className="form-select">
      <label htmlFor={name}>{label}</label>
      <div className="select">
        <select name="" id={name} {...rest}>
          <option hidden>Selecione uma opção</option>

          {options.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}
        </select>
      </div>
    </div>
  );

}

export default Select;