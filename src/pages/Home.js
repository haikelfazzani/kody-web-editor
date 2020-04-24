import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import KodyContext from '../providers/KodyContext';
import Settings from '../containers/Settings';
import Footer from '../components/Footer';
import '../styles/home.css';
import jqLogo from '../img/jquery.svg';

export default function Home () {

  const { state, setState } = useContext(KodyContext);

  const showSettings = () => {
    setState({ ...state, showSettingsModal: true });
  }

  return <div className="home">
    <h1>The Best Online web Editor</h1>

    <p className="mt-0">
      <i className="fab fa-html5 fs-40 mr-20"></i>
      <i className="fab fa-css3-alt fs-40 mr-20"></i>
      <i className="fab fa-js-square fs-40 mr-10"></i>
      <img src={jqLogo} alt="jquery" style={{ maxWidth: '36px' }} className="mr-10" />
      <i className="fab fa-react fs-40"></i>
    </p>


    <p className="cl-gray m-0">With Kody online code editor, </p>
    <p className="cl-gray m-0">you can edit HTML, CSS and JavaScript code, </p>
    <p className="cl-gray mt-0">and view the result in your browser.</p>

    <div className="d-flex">
      <Link to="react" className="btn-start mr-10">react <i className="fas fa-play-circle"></i></Link>
      <Link to="editor" className="btn-start mr-10">web <i className="fas fa-play-circle"></i></Link>
      <div onClick={showSettings} className="btn-start"><i className="fas fa-cogs"></i> Settings</div>
    </div>

    <Settings />

    <Footer />
  </div>;
}