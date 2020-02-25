import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/home.css';

export default function Home () {
  return <div className="home">
    <h1>The Best Online web Editor</h1>

    <p className="mt-0">
      <i className="fab fa-html5 fs-40 mr-20"></i>
      <i className="fab fa-css3-alt fs-40 mr-20"></i>
      <i className="fab fa-js-square fs-40 mr-20"></i>
      <i className="fab fa-react fs-40"></i>
    </p>


    <p className="cl-gray m-0">With Kody online code editor, </p>
    <p className="cl-gray m-0">you can edit HTML, CSS and JavaScript code, </p>
    <p className="cl-gray mt-0">and view the result in your browser.</p>

    <Link to="editor" className="btn-start">START <i className="fas fa-play-circle ml-10"></i></Link>

    <Footer />
  </div>;
}