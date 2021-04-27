import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const PropsLink = (props) => {
  return (
    <Link to={props.to} className="link">{props.title}</Link>
  );
}

export default PropsLink;