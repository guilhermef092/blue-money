import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Button = (props) => {
  return (
    <Link to={props.to} className="button is-large is-fullwidth">{props.title}</Link>

  );
}

export default Button;