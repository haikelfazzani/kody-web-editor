import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({ children, showModal, setShowModal }) {
  return ReactDOM.createPortal(
    <div className={"modal " + (showModal ? 'd-flex' : 'd-none')}>

      <button className='btn br7' onClick={() => { setShowModal(!showModal); }}>
        <i className="fa fa-times"></i>
      </button>

      <div className="bg-dark content scaleIn br7 overflow-auto">
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}