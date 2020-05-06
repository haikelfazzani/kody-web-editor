import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

const icons = ['react', 'vuejs', 'angular', 'ember', 'less', 'js', 'css3-alt', 'html5']

export default function Home () {

  return (
    <div className="jumbotron text-center">
      <h1 className="display-1 mb-0">Kody</h1>      

      <div className="w-50 mb-3">
        <p className="lead m-0">Free and open source Online web editor.</p>
      </div>

      <div className="w-40 d-flex justify-content-around mb-3">
        <Link to="/playground" className="btn btn-outline-warning btn-lg">START NOW</Link>
      </div>

      <div className="mb-3 w-50 row fs-35">

        {icons.map(icon => <div className="col-md-3 mb-3" key={icon}>
          <div className="card">
            <div className="card-body"><i className={"fab fa-" + icon}></i></div>
          </div>
        </div>)}

      </div>

    </div>
  );
}