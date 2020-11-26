import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function CreateModal ({ children, showModal, setShowModal }) {

  return ReactDOM.createPortal(
    <div className={"modal " + (showModal ? 'd-block' : 'd-none')}>
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center scaleIn">
        <div className="w-50 position-relative text-white bg-dark py-3 pl-3 pr-3 overflow-auto">
          <button onClick={() => { setShowModal(!showModal); }} className="position-absolute btn-inherit fs-18" style={{ top: '10px', right: '15px' }}>
            <i className="fa fa-times"></i>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default function Modal ({ children, icon = "fa fa-save" }) {

  const [showModal, setShowModal] = useState(false);

  return <>
    <li className="d-flex align-items-center list-group-item"
      onClick={() => { setShowModal(!showModal); }}><i className={icon}></i>
    </li>

    <CreateModal showModal={showModal} setShowModal={setShowModal}>{children}</CreateModal>
  </>
}