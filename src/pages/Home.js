import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Home.css';
import kodyImg from '../img/editor.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const icons = ['javascript', 'jquery', 'react', 'preact', 'vue', 'backbone', 'typescript', 'coffeescript', 'lodash', 'rxjs', 'pouchdb', 'moment'];

function Home () {

  return (<>
    <Navbar />
    <div className="home-page container">

      <section className="d-flex flex-column justify-content-center align-items-center">
        <div className="row">

          <div className="col-md-6 py-3">
            <h1 className="display-4 mb-0">The online code</h1>
            <h1 className="display-4">editor for the web</h1>

            <p className="text-muted fs-18">Designed for developers by developers, Kody is free and open source web editor for JavaScripters .</p>

            <Link to="/playground" className="btn btn-dark py-2">
              <i className="fa fa-terminal"></i> START NOW, it's free
              </Link>
          </div>

          <div className="col-md-6"><img className="img-fluid mx-auto" src="https://deroados.sirv.com/laptop-user-n.svg" alt="kody online web editor" /></div>

        </div>
      </section>

      <div className="container py-lg-5 py-md-3">

        <section className="py-5">
          <h3 className="text-muted text-center">All in one place</h3>
          <h2 className="text-center mb-5">Your favorite Frameworks and libraries.</h2>
          <div className="row fs-35">
            {icons.map(icon => <div className="col-md-2 mb-3" key={icon}>
              <div className="card">
                <div className="card-body text-center">
                  <img className="mb-3" src={`https://deroados.sirv.com/logos/${icon}.svg`} alt={icon} width="100" height="100" />
                  <span className="text-center text-uppercase font-weight-bold">{icon}</span>
                </div>
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
    </div>
  </>);
}

export default withRouter(Home);
