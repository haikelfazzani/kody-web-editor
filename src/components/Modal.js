import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({ children, showModal, setShowModal }) {
  return ReactDOM.createPortal(
    <div className={"modal " + (showModal ? 'd-flex' : 'd-none')}>
      <div className="bg-dark d-flex flex-column justify-content-center align-items-center content scaleIn br7">

        <button className='btn' onClick={() => { setShowModal(!showModal); }}>
          <i className="fa fa-times"></i>
        </button>

        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}