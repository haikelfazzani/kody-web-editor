import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Index.html', icon: 'html5' },
  { name: 'Style.css', icon: 'css3' },
  { name: 'App.js', icon: 'js' }
];

if (window.Headway) {
  window.Headway.init({ selector: ".changes", account: "ypRAj7" })
}

export default function Tabs ({ getTabIndex }) {

  const [currTabIndex, setCurrTabIndex] = useState(0);

  const setTabIndex = (tabIndex) => {
    getTabIndex(tabIndex);
    setCurrTabIndex(tabIndex)
  }

  return (
    <header className="tabs">
      <div className="w-100 d-flex flex-column">
        <Link className="btn btn-success btn-block" to="/"><i className="fas fa-home"></i></Link>
        
        {tabs.map((tab, i) => <span
          className={"w-100 tab " + (currTabIndex === i ? 'active-tab' : '')}
          onClick={() => { setTabIndex(i) }}
          key={'tab' + i}><i className={"fab fa-" + tab.icon}></i>
        </span>)}

      </div>

    </header>);
}