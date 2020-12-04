import React from 'react';
import { Link } from 'react-router-dom';
import { DropboxAuth } from '../services/DropboxService';

export default function AuthRoutes () {

  const onLogin = () => {
    DropboxAuth.login();
  }

  const onLogout = () => {
    DropboxAuth.logout();
  }

  if (DropboxAuth.getToken()) {
    return <>
      <li className="nav-item">
        <Link className="nav-link mr-3" to="/profile">
          <i className="fa fa-user"></i> Profile
        </Link>
      </li>
      <li className="nav-item">
        <span onClick={onLogout} className="nav-link">
          <i className="fab fa-dropbox"></i> logout
        </span>
      </li>
    </>
  } else {
    return <li className="nav-item">
      <span onClick={onLogin} className="nav-link" title="Sign In With Dropbox">
        <i className="fab fa-dropbox"></i> Sign in
      </span>
    </li>
  }
}