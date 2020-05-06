import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

export default function Home () {

  return (
    <div className="jumbotron text-center">
      <h1 className="display-1 mb-0">Kody</h1>

      <div className="w-40 d-flex justify-content-around mb-3">
        <Link to="/web-editor" className="btn btn-warning btn-lg">
          <i className="fa fa-play"></i> play
        </Link>
      </div>

      <div className="w-50 mb-3">
        <p className="lead m-0">Online web editor that auto-evaluates as you type.</p>
        <p className="lead m-0">Free and open source</p>
      </div>

      <div className="mb-3 w-50 row fs-35">
        <div className="col-md-3"><i className="fab fa-react"></i></div>
        <div className="col-md-3"><i className="fab fa-vuejs"></i></div>
        <div className="col-md-3"><i className="fab fa-angular"></i></div>
        <div className="col-md-3"><i className="fab fa-ember"></i></div>
        <div className="col-md-3"><i className="fa fa-tape"></i></div>

        <div className="col-md-3"><i className="fab fa-js"></i></div>
        <div className="col-md-3"><i className="fab fa-css3-alt"></i></div>
        <div className="col-md-3"><i className="fab fa-html5"></i></div>
      </div>
    </div>
  );
}