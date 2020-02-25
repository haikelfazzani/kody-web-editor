import React, { useContext } from 'react';
import '../styles/sidebar.css';
import { KodyContext } from '../hooks/KodyProvider';
import Select from '../components/Select';
import Button from '../components/Button';

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
    setState({ ...state, live: !state.live, runcode: true });
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
      <li className="border-top"><Select onChange={onFontSize} data={fontSizes} /></li>

      <li className="border-top">
        <Button
          onClick={livePreview}
          text="Live"
          clx={state.live ? "bg-green" : "bg-dark"} />
      </li>
    </ul>
  </div>;
}