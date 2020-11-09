import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Home.css';
import kodyImg from '../img/editor.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const icons = ['react', 'vuejs', 'angular', 'ember', 'sass', 'js'];

function Home () {

  return (<div className="home-page">

    <Navbar />

    <section className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 mb-0">The online code</h1>
      <h1>editor for the web</h1>

      <p className="">see result in live view or in editor console</p>

      <div>
        <Link to="/playground" className="btn btn-outline-success btn-lg py-3 my-3">
          <i className="fa fa-terminal"></i> START NOW, it's free
        </Link>
      </div>
    </section>

    <div className="container py-lg-5 py-md-3">

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

      <section className="py-5 text-center">
        <h3 className="text-muted text-center">Built for developers</h3>
        <h2 className="text-center mb-5">CREATE YOUR OWN VIEWS.</h2>
        <img src={kodyImg} alt="kody web editor" className="img-fluid mx-auto" />
      </section>

    </div>

    <Footer />
  </div>);
}

export default withRouter(Home);
