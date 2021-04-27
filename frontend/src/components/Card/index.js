import React from 'react';

import './styles.css';

function Card(props) {
  return (
    <div className="card-container">
      <div className="card-title">
        <img src={props.logo} alt="Receita" />
        <h3>{props.title}</h3>
      </div>

      <div className="card-body">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Card;