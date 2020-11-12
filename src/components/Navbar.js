import React, { useState } from 'react';
import kodyLogo from '../img/logo.png';
import { Link, withRouter } from 'react-router-dom';
import { DropboxAuth } from '../services/DropboxService';

function Navbar () {

  const [navToggle, setNavToggle] = useState(false);

  const onNavToggle = () => {
    setNavToggle(!navToggle);
  }

  const onLogin = () => {
    DropboxAuth.login();
  }

  const onLogout = () => {
    DropboxAuth.logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center font-weight-bold">
          <img src={kodyLogo} width="30" height="30" alt="kody" loading="lazy" className="mr-2" />
          <span>Kody</span>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={onNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" style={{ display: navToggle ? 'block' : 'none' }}>
          <ul className="navbar-nav mr-auto"></ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link mr-3"><i className="fa fa-info-circle"></i> About</span>
            </li>

            {DropboxAuth.getToken()
              ? <>
                <li className="nav-item">
                  <Link className="nav-link mr-3" to="/profile"><i className="fa fa-user"></i> Profile</Link>
                </li>
                <li className="nav-item">
                  <span onClick={onLogout} className="nav-link"><i className="fab fa-dropbox"></i> logout</span>
                </li>
              </>

              : <li className="nav-item">
                <span onClick={onLogin} className="nav-link" title="Sign In With Dropbox"><i className="fab fa-dropbox"></i> Sign in</span>
              </li>}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

