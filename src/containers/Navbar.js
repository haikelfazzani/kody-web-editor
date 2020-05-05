import React from 'react';
import { Link } from 'react-router-dom';
import SelectFont from './SelectFont';

import '../styles/Navbar.css';

export default function Navbar () {
  return <nav className="cs-header">

  <div className="w-25 d-flex">
  <Link to="/" className="btn btn-success mr-3">
      <i className="fas fa-home" data-toggle="tooltip"
        data-placement="top" title="Back Home"></i> Kody
    </Link>

    <Link to="/" className="btn btn-primary mr-3">
      <i className="fas fa-home" data-toggle="tooltip"
        data-placement="top" title="Back Home"></i> Home
    </Link>
  </div>

  <div className="w-75 d-flex justify-content-end">
    <SelectFont />
    <button className="btn btn-primary ml-3 mr-3"><i className="fas fa-plus"></i> library</button>
    <button className="btn btn-primary mr-3"><i className="fas fa-share"></i> share</button>
    <button className="btn btn-primary"><i className="fas fa-code"></i> embed</button>
  </div>
</nav>;
}