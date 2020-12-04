import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { withRouter } from 'react-router-dom';

function About () {
  return (<main>
    <Navbar />
    <div className="container text-center py-5">

      <div><i className="display-1 fas fa-tree mb-3"></i></div>

      <h1 className="display-4">Free For Open-Source!</h1>
      <p className="lead mb-0">Kody is built by <a href="https://twitter.com/HaikelFazzani" target="_blank" rel="noopener noreferrer">Haikel Fazzani</a> on open-source and wouldn’t exist without it.</p>
      <p className="lead">We’re happy to give something back by being completely free for open source.</p>

      <hr className="w-25 mx-auto" />

      <figure>
        <blockquote className="blockquote">
          <p className="m-0">Any fool can write code that a computer can understand.</p>
          <p className="m-0">Good programmers write code that humans can understand</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          <cite title="Source Title">Martin Fowler</cite>
        </figcaption>
      </figure>

      <div className="mb-3">
        <a href="https://github.com/haikelfazzani/kody-web-editor" className="mr-2" target="_blank" rel="noopener noreferrer">
          <i className="display-4 fab fa-github-square"></i>
        </a>

        <a href="https://twitter.com/HaikelFazzani" className="ml-2" target="_blank" rel="noopener noreferrer">
          <i className="display-4 fab fa-twitter-square"></i>
        </a>
      </div>

    </div>

    <Footer />

  </main>);
}

export default withRouter(About);