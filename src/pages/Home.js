import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Home.css';
import kodyImg from '../img/editor.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import laptopImg from '../img/laptop.png';

const icons = ['react', 'vuejs', 'angular', 'ember', 'sass', 'js'];

function Home () {

  return (<div className="home-page">

    <Navbar />

    <div className="container py-lg-5 py-md-3">

      <section className="py-5">
        <div className="row">

          <div className="col-md-6">
            <h1 className="display-3 mb-0">Web Development Made Faster</h1>

            <p className="lead text-uppercase m-0">Test your ideas early and often..</p>
            <p className="lead text-uppercase m-0">Free and open source.</p>

            <Link to="/playground" className="btn btn-success btn-lg my-3">
              <i className="fa fa-terminal"></i> START NOW
            </Link>

          </div>

          <div className="col-md-6">
            <img src={laptopImg} alt="..." className="w-100" />
          </div>
        </div>
      </section>


      <section className="py-5">
        <h3 className="text-muted text-center">All in one</h3>
        <h2 className="text-center mb-5">Choose framework.</h2>
        <div className="row fs-35">
          {icons.map(icon => <div className="col-md-4 mb-3" key={icon}>
            <div className="card">
              <div className="card-body text-center"><i className={"fab fa-" + icon}></i></div>
            </div>
          </div>)}
        </div>
      </section>


      <section className="py-5">
        <div className="w-100 d-flex flex-column justify-content-center">
          <h3 className="text-muted text-center">Built for developers</h3>
          <h2 className="text-center mb-5">Create your own views.</h2>
          <img src={kodyImg} alt="kody web editor" className="img-fluid mx-auto" />
        </div>
      </section>


    </div>

    <Footer />
  </div>);
}

export default withRouter(Home);
