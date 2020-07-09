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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={kodyLogo} width="30" height="30" alt="" loading="lazy" className="rounded-circle mr-2" />
          <span className="fs-12">Picode</span>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={onNavToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" style={{ display: navToggle ? 'block' : 'none' }}>
          <ul className="navbar-nav mr-auto"></ul>

          <ul className="navbar-nav">

            <li className="nav-item">
              <span className="nav-link fs-10 mr-3"><i className="fa fa-circle text-success"></i> Status</span>
            </li>

            {DropboxAuth.getToken()
              ? <>
                <li className="nav-item">
                  <Link className="nav-link fs-10 mr-3" to="/profile"><i className="fa fa-user"></i> Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={onLogout} className="btn btn-success fs-10 h-100">
                    <i className="fab fa-dropbox"></i> logout</button>
                </li>
              </>

              : <li className="nav-item">
                <button onClick={onLogin} className="btn btn-success fs-10 h-100">
                  <i className="fab fa-dropbox"></i> Sign in</button>
              </li>}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

