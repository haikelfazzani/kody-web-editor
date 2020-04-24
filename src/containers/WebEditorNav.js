import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import KodyContext from '../providers/KodyContext';
import Button from '../components/Button';
import beautify from 'js-beautify';
import logo from '../img/logo192.png';
import { downloadAsHTML } from '../util/download-file';

export default function WebEditorNav () {

  const { state, setState } = useContext(KodyContext);

  const switchTab = (tab) => {
    setState({ ...state, mode: tab });
  }

  const runCode = useCallback(() => {
    setState({ ...state, runcode: true });
    setTimeout(() => {
      setState({ ...state, runcode: false });
    }, 500);
  }, [state, setState]);

  const formatCode = () => {
    setState({
      ...state,
      html: beautify.html(state.html, { indent_size: 2 }),
      css: beautify.css(state.css, { indent_size: 2 }),
      javascript: beautify.js(state.javascript, { indent_size: 2 })
    });
  }

  const downloadFile = () => {
    downloadAsHTML(state.html, state.css, state.javascript);
  }

  return <>
    <ul>
      <li>
        <Button
          onClick={runCode}
          clx={state.runcode ? "bg-green" : "bg-rose"}
          text={<i className="fas fa-play"></i>}
        />
      </li>

      <li className="border-top"><Button onClick={() => switchTab('html')} text="html" /></li>
      <li><Button onClick={() => switchTab('css')} text="css" /></li>
      <li><Button onClick={() => switchTab('javascript')} text="js" /></li>
    </ul>

    <ul>
      <li className="border-top"><Button onClick={formatCode} text="Format" clx="bg-gray" /></li>
      <li><Button onClick={downloadFile} clx="bg-gray" text={<i className="fas fa-download"></i>} /></li>      
      <li className="border-top mb-10"><Link to="/"><img src={logo} alt="logo.." className="img-logo" /></Link></li>
    </ul>
  </>;
}