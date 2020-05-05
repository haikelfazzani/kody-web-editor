import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

export default function Home () {

  return (
    <div className="jumbotron text-center">
      <h1 className="display-1">Kody</h1>

      <p className="lead w-50 mx-auto m-0">Online web editor that auto-evaluates as you type.</p>
      <p>Free and open source</p>

      <div className="mb-3 w-20 d-flex justify-content-around fs-35">
        <span><i className="fab fa-react"></i></span>
        <span><i className="fab fa-js"></i></span>
        <span><i className="fab fa-css3-alt"></i></span>
        <span><i className="fab fa-html5"></i></span>
      </div>

      <div className="w-40 d-flex justify-content-around">
       {/* <Link to={"/web-editor?room="+Date.now()} className="btn btn-outline-warning btn-lg"><i className="fab fa-html5"></i> Web Editor</Link> */}
       <Link to="/web-editor" className="btn btn-outline-warning btn-lg"><i className="fab fa-html5"></i> Web Editor</Link>
      </div>

    </div>
  );
}