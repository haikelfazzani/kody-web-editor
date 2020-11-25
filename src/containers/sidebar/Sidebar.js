import React, { useState } from 'react';
import AddPackage from './AddPackage';
import './Sidebar.css';

export default function Sidebar () {

  const [show, setShow] = useState(false); // show sidebar (right)

  const onShow = () => { setShow(!show); }

  return (
    <nav className={"nav " + (show ? 'nav-open' : '')}>

      <div>
        <button className="nav__toggle" onClick={onShow}>{show ? 'X' : '+'}</button>
      </div>

      <div className="sidebar-content">
        <AddPackage />
      </div>
    </nav>
  );
}