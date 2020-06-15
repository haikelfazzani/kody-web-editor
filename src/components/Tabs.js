import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Index.html', icon: 'html5' },
  { name: 'Style.css', icon: 'css3' },
  { name: 'App.js', icon: 'js' }
]

export default function Tabs ({ getTabIndex }) {

  const [currTabIndex, setCurrTabIndex] = useState(0);

  const setTabIndex = (tabIndex) => {
    getTabIndex(tabIndex);
    setCurrTabIndex(tabIndex)
  }

  return (<div>
    <Link className="btn btn-success dsp-none" to="/"><i className="fa fa-home"></i></Link>
    {tabs.map((tab, i) => <button
      className={"btn btn-secondary " + (currTabIndex === i ? 'active-tab' : '')}
      onClick={() => { setTabIndex(i) }} key={'tab' + i}>
      <i className={"fab fa-" + tab.icon}></i><span className="dsp-none ml-2">{tab.name}</span>
    </button>)}
  </div>);
}