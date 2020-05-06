import React from 'react';
import { Link } from 'react-router-dom';
import SelectFont from './SelectFont';

import '../styles/Navbar.css';
import ButtonInput from './ButtonInput';

export default function Navbar () {  

  const onDownload = () => {
    let codeResult = localStorage.getItem('reacto-web-editor');

    if (codeResult) {
      codeResult = JSON.parse(codeResult).tabs;

      let text = `
<html>
  <head>
    <style>
      ${codeResult[1].code}
    </style>
  </head>
  <body>

    ${codeResult[0].code} 

    <script>
      ${codeResult[2].code}
    </script>
  </body>
</html>
      `;

      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', 'kody.html');

      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  return <nav className="cs-header">

    <div className="w-25 d-flex">
      <Link to="/" className="btn btn-success mr-3">
        <i className="fas fa-shapes"></i> Kody
      </Link>

      <Link to="/" className="btn btn-primary mr-3">
        <i className="fas fa-home" data-toggle="tooltip"
          data-placement="top" title="Back Home"></i>
      </Link>
    </div>


    <div className="w-75 d-flex justify-content-end">
      <SelectFont />

      <ButtonInput />

      <button className="btn btn-primary mr-3" onClick={onDownload}>
      <i className="fas fa-download"></i>
    </button>

      <a className="btn btn-primary" href="https://github.com/haikelfazzani/kody-web-editor">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </nav>;
}