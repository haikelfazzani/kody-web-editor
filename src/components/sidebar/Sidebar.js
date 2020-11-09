import React, { useState } from 'react';
import FormSavePaste from './FormSavePaste'
import Settings from './Settings';

const edFiles = [
  { name: 'Index.html', icon: 'html5' },
  { name: 'Style.css', icon: 'css3' },
  { name: 'App.js', icon: 'js' }
];

const EditorFiles = ({ getFileIndex }) => {

  const [currEdFileIndex, setcurrEdFileIndex] = useState(0);

  const setEdFileIndex = (currIndex) => {
    getFileIndex(currIndex);
    setcurrEdFileIndex(currIndex)
  }

  return <ul className="list-group">
    {edFiles.map((tab, i) => <span
      className={"list-group-item " + (currEdFileIndex === i ? 'active-file-index' : '')}
      onClick={() => { setEdFileIndex(i) }}
      key={'tab' + i}><i className={"fab fa-" + tab.icon}></i> {tab.name}
    </span>)}
  </ul>
}

const tabs = [
  { id: 0, name: 'files', icon: 'fa fa-file', comp: '' },
  { id: 1, name: 'save paste', icon: 'fa fa-save', comp: <FormSavePaste /> },
  { id: 2, name: 'configuration', icon: 'fa fa-cog', comp: <Settings /> }
];

if (window.Headway) {
  window.Headway.init({ selector: ".changes", account: "ypRAj7" })
}

export default function Sidebar ({ getTabIndex }) {

  const [currTabIndex, setCurrTabIndex] = useState(0);
  const [showTab, setShowTab] = useState(true);

  const setTabIndex = (tab) => {
    setCurrTabIndex(tab.id);
    if (currTabIndex !== tab.id) {
      setShowTab(false)
    } else {
      setShowTab(!showTab)
    }
  }

  return (
    <header className={"h-100 side-tabs d-flex " + (showTab ? "w-side-tabs" : "")}>

      <ul className="tabs list-group">
        {tabs.map(tab => <li className={"list-group-item " + (currTabIndex === tab.id ? 'text-warning' : '')}
          key={tab.name} onClick={() => { setTabIndex(tab) }}>
          <i className={tab.icon}></i></li>)}        
      </ul>

      <div className="h-100 w-100 flex-column">

        <div className="list-group-item bg-dark-gray text-uppercase text-warning">
          <i className="fas fa-caret-down fs-18"></i> {tabs[currTabIndex].name}
        </div>

        {tabs.map(tab => <div key={tab.name} style={{ display: tab.id === currTabIndex ? 'block' : 'none' }}>
          {tab.name === 'files' ? <EditorFiles getFileIndex={getTabIndex} /> : tab.comp}</div>)}
      </div>

    </header>);
}