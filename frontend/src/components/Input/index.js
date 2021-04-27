import React from 'react';

import './styles.css';

const Input = ({ label, name, type, ...rest }) => {
  return (
    <div className="control">
      <label htmlFor="">{label} <strong>*</strong></label>
      <input className="input is-medium" id={name} type={type} {...rest} />
    </div>
  )
}

export default Input;