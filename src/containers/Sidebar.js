import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import KodyContext from '../providers/KodyContext';
import Button from '../components/Button';
import Settings from './Settings';
import beautify from 'js-beautify';
import logo from '../img/logo192.png';
import { downloadAsHTML, downloadAsJsx } from '../util/download-file';

export default function Sidebar () {

  const { state, setState } = useContext(KodyContext);

  const switchTab = (tab) => {
    setState({ ...state, mode: tab });
  }

  const runCode = useCallback(() => {
    setState({ ...state, runcode: true });
    setTimeout(() => {
      setState({ ...state, runcode: false });
    }, 800);
  }, [state, setState]);

  const formatCode = () => {
    setState({
      ...state,
      html: beautify.html(state.html, { indent_size: 2 }),
      css: beautify.css(state.css, { indent_size: 2 }),
      javascript: beautify.js(state.javascript, { indent_size: 2 })
    });
  }

  const showSettings = () => {
    setState({ ...state, showSettingsModal: true });
  }

  const downloadFile = () => {
    if (state.mode === 'html' || state.mode === 'css' || state.mode === 'javascript') {
      downloadAsHTML(state.html, state.css, state.javascript)
    }
    else { downloadAsJsx(state.jsx); }
  }

  return <div className="side-bar">
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
      <li className="border-top"><Button onClick={() => switchTab('jsx')} text={'react'} /></li>
    </ul>

    <ul>
      <li className="border-top"><Button onClick={formatCode} text="Format" clx="bg-gray" /></li>
      <li><Button onClick={downloadFile} clx="bg-gray" text={<i className="fas fa-download"></i>} /></li>
      <li><Button onClick={showSettings} clx="bg-gray" text={<i className="fas fa-cogs"></i>} /></li>
      <li className="border-top mb-10"><Link to="/"><img src={logo} alt="logo.." className="img-logo" /></Link></li>
    </ul>

    <Settings />
  </div>;
}