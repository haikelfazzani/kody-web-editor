import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import AddLibrary from './AddLibrary';
import Timer from './Timer';
import SelectFramework from './SelectFramework';

import './Navbar.css';

export default function Navbar () {

  const isSassEnabled = useStoreState(state => state.webeditor.model.isSassEnabled);
  const enableSass = useStoreActions(actions => actions.webeditor.enableSass);

  const onEnableSass = () => {
    enableSass(!isSassEnabled);
  }

  const onFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return <nav className="cs-header">

    <div className="w-25 d-flex">
      <Link to="/" className="btn btn-success mr-3">
        <i className="fas fa-shapes"></i> Kody
      </Link>

      <Link to="/" className="btn btn-primary mr-3">
        <i className="fas fa-home" data-toggle="tooltip"
          data-placement="top" title="Back Home"></i>
      </Link>
    </div>


    <div className="w-75 d-flex justify-content-end">      

      <SelectFramework />

      <button className={"btn btn-primary ml-3 " + (isSassEnabled ? "bg-pink" : "")}
        onClick={onEnableSass}
        data-toggle="tooltip" data-placement="bottom" title="Enable sass">
        <i className="fab fa-sass"></i>
      </button>

      <AddLibrary />

      <Timer />      

      <button className="btn btn-primary mr-3" onClick={onFullScreen}>
        <i className="fas fa-compress"></i>
      </button>

      <a className="btn btn-primary" href="https://github.com/haikelfazzani/kody-web-editor">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </nav>;
}