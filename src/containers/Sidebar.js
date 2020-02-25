import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import { KodyContext } from '../hooks/KodyProvider';
import Button from '../components/Button';
import Settings from './Settings';
import beautify from 'js-beautify';
import logo from '../img/logo192.png';

export default function Sidebar () {

  const { state, setState } = useContext(KodyContext);

  const switchTab = (tab) => {
    setState({ ...state, mode: tab });
  }

  const runCode = () => {
    setState({ ...state, runcode: true });
    setTimeout(() => {
      setState({ ...state, runcode: false });
    }, 5000);
  }

  const formatCode = () => {
    setState({
      ...state,
      html: beautify.html(state.html, { indent_size: 2, space_in_empty_paren: true }),
      css: beautify.css(state.css, { indent_size: 2, space_in_empty_paren: true }),
      javascript: beautify.js(state.javascript, { indent_size: 2, space_in_empty_paren: true })
    });
  }

  const showSettings = () => {
    setState({ ...state, showSettingsModal: true });
  }

  return <div className="side-bar">
    <ul>

      <li>
        <button onClick={runCode} className={state.runcode ? "bg-green" : "bg-choc"}>
          <i className="fas fa-play"></i>
        </button>
      </li>

      <li className="border-top"><Button onClick={() => switchTab('html')} text="html" /></li>
      <li><Button onClick={() => switchTab('css')} text="css" /></li>
      <li><Button onClick={() => switchTab('javascript')} text="js" /></li>

      <li className="border-top">
        <Button onClick={() => switchTab('jsx')} text={'react'} />
      </li>
    </ul>

    <ul>
      <li className="border-top"><Button onClick={formatCode} text="Format" clx="bg-gray" /></li>

      <li>
        <button onClick={showSettings} className="bg-gray"><i className="fas fa-cogs"></i></button>
      </li>

      <li className="border-top mb-10">
        <Link to="/"><img src={logo} alt="logo.." /></Link>
      </li>
    </ul>

    <Settings />
  </div>;
}