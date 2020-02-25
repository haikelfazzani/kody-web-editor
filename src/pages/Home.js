import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/home.css';

export default function Home () {
  return <div className="home">
    <h1>Kody</h1>
    <p>Online web editor</p>

    <Link to="editor">GO</Link>

    <Footer />
  </div>;
}