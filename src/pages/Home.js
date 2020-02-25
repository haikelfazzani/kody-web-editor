import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/home.css';

export default function Home () {
  return <div className="home">
    <h1>The Best Online web Editor</h1>
    <h2 className="m-0">NEXT GENERATION</h2>
    <p className="mt-0">HTML - CSS - JAVASCRIPT - REACTJS</p>
    <p className="m-0">With Kody online code editor, </p>
    <p className="mt-0">you can edit HTML, CSS and JavaScript code, and view the result in your browser.</p>

    <Link to="editor" className="btn-start">START <i className="fas fa-play-circle ml-10"></i></Link>

    <Footer />
  </div>;
}