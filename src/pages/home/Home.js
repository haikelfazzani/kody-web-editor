import React, { Suspense } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Home.css';
import Navbar from '../../components/Navbar';

const SectionFrameworks = React.lazy(() => import('./SectionFrameworks'));
const Footer = React.lazy(() => import('../../components/Footer'));

function Home () {

  return (<>
    <Navbar />
    <div className="home-page container">

      <section className="d-flex flex-column justify-content-center align-items-center">
        <div className="row">

          <div className="col-md-6 py-3">
            <h1 className="display-4 mb-0">The online code</h1>
            <h1 className="display-4">editor for the web</h1>

            <p className="text-muted lead">Designed for developers by developers, Kody is free and open source web editor for JavaScripters .</p>

            <Link to="/playground" className="btn btn-dark py-2">
              <i className="fa fa-terminal"></i> START NOW, it's free
              </Link>
          </div>

          <div className="col-md-6"><img className="img-fluid mx-auto" src="https://deroados.sirv.com/laptop-user-n.svg" alt="kody online web editor" /></div>

        </div>
      </section>

      <div className="container py-lg-5 py-md-3">

        <Suspense fallback=""><SectionFrameworks /></Suspense>

        <section className="py-5 text-center">
          <h3 className="text-muted text-center">Built for developers</h3>
          <h2 className="text-center">CREATE YOUR OWN VIEWS.</h2>
          <img src="https://i.ibb.co/QkrTBbD/editor.png" alt="kody online web editor" className="img-fluid mx-auto" />
        </section>
      </div>

      <Suspense fallback=""><Footer /></Suspense>
    </div>
  </>);
}

export default withRouter(Home);
