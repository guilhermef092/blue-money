import React from 'react';

const Modal = (props) => {
  return (
    <div id="modal" className={`modal ${props.active}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {props.children}
      </div>

      <button onClick={props.close} className="modal-close"></button>
    </div>
  );
}

export default Modal;