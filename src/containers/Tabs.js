import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from '../components/DropDown';
import DomUtil from '../util/DomUtil';

const tabFiles = [
  { name: 'Index.html', type: 'html', icon: 'html5', color: 'text-danger', preprocessor: ['html'] },
  { name: 'Style.css', type: 'css', icon: 'css3', color: 'text-primary', preprocessor: ['css', 'less','sass'] },
  {
    name: 'App.js', type: 'js', icon: 'js', color: 'text-warning',
    preprocessor: ['javascript', 'babel', 'typescript', 'coffeescript']
  }
];

export default function Tabs ({ getFileIndex }) {

  const preprocessors = useStoreState(state => state.editorModel.preprocessors);
  const setPreprocessors = useStoreActions(actions => actions.editorModel.setPreprocessors)
  const [currEdFileIndex, setcurrEdFileIndex] = useState(0);

  const setEdFileIndex = (currIndex) => {
    getFileIndex(currIndex);
    setcurrEdFileIndex(currIndex)
  }

  const onSelectItem = (preposType, tab) => {
    switch (tab.type) {
      case 'html':        
        setPreprocessors({ ...preprocessors, html: preposType });
        break;

      case 'css':
        DomUtil.appendScript(preposType);
        DomUtil.removeElement(preprocessors.css);
        setPreprocessors({ ...preprocessors, css: preposType });
        break;

      case 'js':
        DomUtil.appendScript(preposType);
        DomUtil.removeElement(preprocessors.js);
        setPreprocessors({ ...preprocessors, js: preposType });
        break;

      default:
        break;
    }
  }

  return <ul className="list-group d-flex">
    <li className="d-flex align-items-center list-group-item">
      <Link to="/"><i className="fas fa-home text-white"></i></Link>
    </li>
    {tabFiles.map((tab, i) => <li
      className={"d-flex align-items-center list-group-item pr-2 " + (currEdFileIndex === i ? 'active-tab' : '')}
      key={'tab' + i}>   
         
      <span onClick={() => { setEdFileIndex(i) }}>
        <i className={tab.color + " mr-2 fab fa-" + tab.icon}></i> {preprocessors[tab.type]}
      </span>

      <DropDown
        dispText={false}
        items={tab.preprocessor}
        selectedItem={preprocessors[tab.type]}
        onSelectItem={(v) => { onSelectItem(v, tab) }}
      />
    </li>)}
  </ul>
}