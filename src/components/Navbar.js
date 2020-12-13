import React, { useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import kodyLogo from '../img/logo.png';

function Navbar () {

  const [navToggle, setNavToggle] = useState(false);

  const onNavToggle = () => {
    setNavToggle(!navToggle);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center font-weight-bold">
          <img src={kodyLogo} width="30" height="30" alt="online web editor" loading="lazy" className="mr-2" />
          <span>Kody</span>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={onNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" style={{ display: navToggle ? 'block' : 'none' }}>
          <ul className="navbar-nav mr-auto"></ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="nav-link mr-3"><i className="fa fa-info-circle"></i> About</Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link mr-3"><i className="fa fa-envelope"></i> Contact</Link>
            </li>


            <AuthRoutes />
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

