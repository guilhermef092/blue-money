import React from 'react';

import './styles.css';

const Status = (props) => {
  return (
    <div className="column column-card" style={props.color}>

      <div className="status-img">
        <img src={props.img} alt="" />
      </div>

      <div className="status-content">
        <label htmlFor="">{props.title}</label>
        <p>{props.value}</p>
      </div>
    </div>
  );
}

export default Status;