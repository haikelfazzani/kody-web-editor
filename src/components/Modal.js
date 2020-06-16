import React from 'react';

export default function Modal ({ children, showModal, setShowModal, title }) {

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal"
              aria-label="Close" onClick={() => { setShowModal(!showModal) }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">{children}</div>

        </div>
      </div>
    </div>
  );
}