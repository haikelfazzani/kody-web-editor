import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About () {
  return (<main>

    <Navbar />

    <div className="container text-center py-5">

      <span><i className="display-1 fas fa-tree mb-3"></i></span>

      <h1 class="display-4">Free For Open-Source!</h1>
      <p class="lead mb-0">Kody is built by <a href="https://github.com/haikelfazzani" target="_blank" rel="noopener noreferrer">Haikel Fazzani</a> on open-source and wouldn’t exist without it.</p>
      <p class="lead">We’re happy to give something back by being completely free for open source.</p>

      <hr className="w-25 mx-auto" />

      <figure>
        <blockquote class="blockquote">
          <p className="m-0">A programming language is for thinking about programs,</p>
          <p className="m-0">not for expressing programs you've already thought of.</p>
          <p className="m-0">It should be a pencil, not a pen.</p>
        </blockquote>
        <figcaption class="blockquote-footer"><cite title="Source Title">Paul Graham</cite></figcaption>
      </figure>

      <span><a href="https://github.com/haikelfazzani/kody-web-editor" target="_blank" rel="noopener noreferrer"><i className="display-4 fab fa-github mb-3"></i></a></span>

    </div>

    <Footer />

  </main>);
}