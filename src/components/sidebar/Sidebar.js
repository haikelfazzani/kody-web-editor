import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddPackage from './AddPackage';
import FormSavePaste from './FormSavePaste'
import Settings from './Settings';

const edFiles = [
  { name: 'Index.html', icon: 'html5', color: 'text-danger' },
  { name: 'Style.css', icon: 'css3', color: 'text-primary' },
  { name: 'App.js', icon: 'js', color: 'text-warning' }
];

const EditorFiles = ({ getFileIndex }) => {

  const [currEdFileIndex, setcurrEdFileIndex] = useState(0);

  const setEdFileIndex = (currIndex) => {
    getFileIndex(currIndex);
    setcurrEdFileIndex(currIndex)
  }

  return <ul className="list-group fs-14">
    <li className="list-group-item"><i className="fa fa-folder-open text-info"></i> src</li>
    {edFiles.map((tab, i) => <li
      className={"list-group-item " + (currEdFileIndex === i ? 'active-file-index' : '')}
      onClick={() => { setEdFileIndex(i) }}
      key={'tab' + i}><span className="ml-4"><i className={tab.color + " mr-2 fab fa-" + tab.icon}></i> {tab.name}</span>
    </li>)}
  </ul>
}

const tabs = [
  { id: 0, name: 'files', icon: 'fa fa-file', comp: '' },
  { id: 1, name: 'save paste', icon: 'fa fa-save', comp: <FormSavePaste /> },
  { id: 2, name: 'configuration', icon: 'fa fa-cog', comp: <Settings /> },
  { id: 3, name: 'packages', icon: 'fa fa-cube', comp: <AddPackage /> }
];

if (window.Headway) {
  window.Headway.init({ selector: ".changes", account: "ypRAj7" })
}

export default function Sidebar ({ getTabIndex }) {

  const [currTabIndex, setCurrTabIndex] = useState(0);
  const [showTab, setShowTab] = useState(false);

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
        {tabs.map(tab => <li className={"list-group-item " + (currTabIndex === tab.id ? 'active-tab' : '')}
          key={tab.name} onClick={() => { setTabIndex(tab) }}>
          <i className={tab.icon}></i></li>)}

        <li className="list-group-item d-links">
          <Link to="/"><i className="fas fa-home text-white"></i></Link>
        </li>
      </ul>

      <div className="h-100 w-100 flex-column overflow-auto">

        <div className="list-group-item bg-dark-gray text-uppercase text-warning">
          <i className="fas fa-caret-down fs-18"></i> {tabs[currTabIndex].name}
        </div>

        {tabs.map(tab => <div key={tab.name} style={{ display: tab.id === currTabIndex ? 'block' : 'none' }}>
          {tab.name === 'files' ? <EditorFiles getFileIndex={getTabIndex} /> : tab.comp}</div>)}
      </div>

    </header>);
}