import React, { useContext } from 'react';
import '../styles/sidebar.css';
import { KodyContext } from '../hooks/KodyProvider';
import Select from '../components/Select';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];

export default function Sidebar () {

  const { state, setState } = useContext(KodyContext);

  const switchTab = (tab) => {
    setState({ ...state, mode: tab });
  }

  const onFontSize = (e) => {
    setState({ ...state, fontSize: +e.target.value })
  }

  return <ul className="side-bar">
    <li><button onClick={() => switchTab('html')}>html</button></li>
    <li><button onClick={() => switchTab('css')}>css</button></li>
    <li><button onClick={() => switchTab('javascript')}>js</button></li>

    <li className="border-top"><button onClick={() => switchTab('jsx')}>reactjs</button></li>

    <li className="border-top"><Select onChange={onFontSize} data={fontSizes} /></li>
  </ul>;
}