import React from 'react';

import './styles.css';

const PageLogo = ({logo}) => {
  return (
    <div className="column info">
      <div className="info">
        <img src={logo} alt="" />
        <p>Não permita que suas contas fiquem no vermelho, tenha as receitas e despesas, sempre à mão.</p>
      </div>
    </div>
  );
}

export default PageLogo;