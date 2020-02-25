import React, { useContext } from 'react';
import '../styles/sidebar.css';
import { KodyContext } from '../hooks/KodyProvider';
import Select from '../components/Select';
import Button from '../components/Button';
import beautify from 'js-beautify';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];

export default function Sidebar () {

  const { state, setState } = useContext(KodyContext);

  const switchTab = (tab) => {
    setState({ ...state, mode: tab });
  }

  const onFontSize = (e) => {
    setState({ ...state, fontSize: +e.target.value });
  }

  const runCode = () => {
    setState({ ...state, runcode: true });
    setTimeout(() => {
      setState({ ...state, runcode: false });
    }, 5000);
  }

  const livePreview = () => {
    setState({ ...state, live: !state.live, runcode: !state.live });
  }

  const formatCode = () =>{
    setState({ 
      ...state, 
      html: beautify.html(state.html),
      css: beautify.css(state.css),
      javascript: beautify.js(state.javascript, { indent_size: 2, space_in_empty_paren: true })
    });
  }

  return <div className="side-bar">
    <ul>
      <li><Button onClick={runCode} text='RUN' clx={state.runcode ? "bg-green" : "bg-choc"} /></li>

      <li className="border-top"><Button onClick={() => switchTab('html')} text="html" /></li>
      <li><Button onClick={() => switchTab('css')} text="css" /></li>
      <li><Button onClick={() => switchTab('javascript')} text="js" /></li>

      <li className="border-top">
        <Button onClick={() => switchTab('jsx')} text={'react'} />
      </li>
    </ul>

    <ul>
      <li className="border-top">
        <Button
          onClick={formatCode}
          text="Format"
        />
      </li>

      <li>
        <Button
          onClick={livePreview}
          text="Live"
          clx={state.live ? "bg-green" : "bg-dark"}
        />
      </li>

      <li className="mb-10"><Select onChange={onFontSize} data={fontSizes} /></li>
    </ul>
  </div>;
}