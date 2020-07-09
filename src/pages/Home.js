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

          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-4 mb-0">The online code editor for web</h1>
            <p className="lead text-muted text-uppercase m-0"><i className="fa fa-smile-beam"></i> Free and open source.</p>

            <div className="fs-34">
              <i className="fab fa-html5 text-danger mr-3"></i>
              <i className="fab fa-css3 text-primary mr-3"></i>
              <i className="fab fa-js text-warning mr-3"></i>
              <i className="fab fa-vuejs text-success mr-3"></i>
              <i className="fab fa-react text-info mr-3"></i>
              <i className="fab fa-sass text-pink"></i>
            </div>

            <div>
            <Link to="/playground" className="btn btn-dark btn-lg my-3">
              <i className="fa fa-terminal"></i> START NOW, it's free
            </Link>
            </div>

          </div>

          <div className="col-md-6">
            <img src={laptopImg} alt="..." className="w-100" />
          </div>
        </div>
      </section>


      <section className="py-5">
        <h3 className="text-muted text-center">All in one place</h3>
        <h2 className="text-center mb-5">Choose template.</h2>
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
