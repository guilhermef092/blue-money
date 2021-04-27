import React from 'react';

import './styles.css';

const Form = (props) => {
  return (
    <div className="column">
      <div className="form">
        <div className="form-container">

          <h1>{props.title}</h1>
          {props.children}

        </div>
      </div>
    </div>
  );

}

export default Form;