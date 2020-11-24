import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function CreateModal ({ children, showModal }) {
  return ReactDOM.createPortal(
    <div className={"modal " + (showModal ? 'd-block' : 'd-none')}>
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center scaleIn">{children}</div>
    </div>,
    document.getElementById('modal')
  );
}

export default function Modal ({ children }) {

  const [showModal, setShowModal] = useState(false);

  return <>
    <li className="d-flex align-items-center list-group-item"
      onClick={() => { setShowModal(!showModal); }}><i className="fa fa-save"></i>
    </li>

    <CreateModal showModal={showModal}>{children}</CreateModal>
  </>
}