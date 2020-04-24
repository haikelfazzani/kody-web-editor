import React from 'react';

export default function Modal ({ children, show }) {
  return (<div className="modal" style={{ display: show ? 'flex' : 'none' }}>
    {children}
  </div>);
}