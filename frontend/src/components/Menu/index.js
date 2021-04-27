import React from 'react';

import Link from '../Link';

import './styles.css';

const Menu = (props) => {
  return (
    <div>
      <div className="logo-container">
        <img src={props.logo} alt="" />
        <label htmlFor="">{props.user}</label>
        <Link to="/" title="Editar Perfil" />
      </div>

      <div className="butons-container">
        {props.children}
      </div>

      <div className="logout-container">
        <button onClick={props.OnClickFunc}>
          <img src={props.logout} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Menu;