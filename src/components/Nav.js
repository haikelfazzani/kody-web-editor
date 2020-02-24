import React from 'react';
import '../styles/nav.css';
import logo from '../img/logo32.png';

export default function Nav () {

  return <nav>
    <div>
      <img src={logo} alt="logo.." width="30" className="mr-10" />
      <h3 className="m-0">Kody</h3>
    </div>
  </nav>;
}