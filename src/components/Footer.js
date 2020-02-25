import React from 'react';
import '../styles/footer.css';

export default function Footer () {
  return <footer>
    <p className="cl-gray m-0">© 2020 - Kody online web editor</p>
    <p className="cl-gray m-0">
      Created with <i className="fas fa-heart"></i> and <i className="fas fa-coffee"></i> by
      <a href="https://github.com/haikelfazzani" className="cl-gray"> Haikel Fazzani</a>
      </p>
  </footer>;
}