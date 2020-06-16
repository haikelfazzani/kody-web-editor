import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import FormLogin from '../containers/FormLogin';
import kodyLogo from '../img/logo.png';
import PastebinService from '../services/PastebinService';
import { Link } from 'react-router-dom';

export default function Navbar () {

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (PastebinService.getApiKey()) {
      setUsername(PastebinService.getUsername());
    }
  }, []);

  return (<>
    <nav className="navbar navbar-light bg-light mb-5 overflow-auto">
      <div className="container">
        <Link to="/"><img src={kodyLogo} width="30" height="30" alt="" /> Kody</Link>

        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              {username
                ? <Link to="/profile"><i className="fa fa-user"></i> {username}</Link>
                : <button className="btn btn-success" onClick={() => { setShowModal(!showModal); }}>Login</button>}
            </li>
          </ul>

        </div>

      </div>
    </nav>

    <Modal showModal={showModal} setShowModal={setShowModal} title="Login to Pastebin">
      <FormLogin />
    </Modal>
  </>);
}