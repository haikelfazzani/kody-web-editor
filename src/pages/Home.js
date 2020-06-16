import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import kodyImg from '../img/editor.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const icons = ['react', 'vuejs', 'angular', 'ember', 'sass', 'js'];

export default function Home () {

  return (<div className="home-page">

    <Navbar />

    <div className="container py-lg-5 py-md-3">

      <div className="row">


        <div className="col-md-5">
          <h1 className="display-1 mb-0">Kody</h1>

          <p className="m-0">JavaScript, CSS, HTML online with Kody code editor.</p>
          <p className="m-0">Free and open source.</p>

          <Link to="/playground" className="btn btn-success btn-lg my-3">
            <i className="fa fa-play"></i> START NOW
          </Link>

          <div className="row fs-35 mb-3">
            {icons.map(icon => <div className="col-md-4 mb-3" key={icon}>
              <div className="card">
                <div className="card-body text-center"><i className={"fab fa-" + icon}></i></div>
              </div>
            </div>)}
          </div>

        </div>

        <div className="col-md-1"></div>

        <div className="col-md-6"><img src={kodyImg} alt="kody web editor" /></div>

      </div>


    </div>

    <Footer />
  </div>);
}