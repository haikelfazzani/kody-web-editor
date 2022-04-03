import React, { useContext, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlaygroundContext } from '../store/PlaygroundProvider';
import Dropdown from '../components/DropDown';

import templates from '../util/templates/index';
import Preprocessor from '../util/Preprocessor';
import FormSavePaste from './FormSavePaste';
import Modal from '../components/Modal';

const tabs = [
  { name: 'html', icon: 'html5', color: 'red', preprocessor: ['html'] },
  { name: 'css', icon: 'css3', color: 'blue', preprocessor: ['css', 'less', 'sass'] },
  {
    name: 'javascript', icon: 'js', color: 'yellow', preprocessor: [
      'javascript', 'babel', 'typescript', 'coffeescript', 'babel+typescript'
    ]
  }
];

const fontSizes = [14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34];
const themes = ['monokai', 'dracula', 'cobalt', 'one_dark', 'eclipse', 'xcode', 'tomorrow'];

export default function Menu({ children }) {
  const { playgroundState, dispatch } = useContext(PlaygroundContext);
  const [showModal, setShowModal] = useState(false)

  const onTab = useCallback(tabIndex => {
    dispatch({ type: 'tab-index', payload: { tabIndex } });
  }, []);

  const onLangChange = (language, index) => {
    const languages = Object.assign({}, playgroundState.languages);
    const name = Object.keys(languages)[index];
    languages[name] = language;
    dispatch({ type: 'language', payload: { ...languages } });
    Preprocessor.loadCDN(language);
  }

  const onTemplateChange = (template) => {
    dispatch({ type: 'template', payload: { template } })
  }

  const onTheme = (theme) => {
    dispatch({ type: 'theme', payload: { theme } })
  }

  const onFontSize = (fontSize) => {
    dispatch({ type: 'fontSize', payload: { fontSize } })
  }

  return <header className='w-100 d-flex justify-between align-center'>
    <ul className='h-100 d-flex align-center'>
      <li><Link to="/"><i className="fas fa-home text-white"></i></Link></li>
      {tabs.map((tab, i) => <li key={tab.name} className={playgroundState.tabIndex === i ? 'active-tab' : ''}>
        <Dropdown
          index={i}
          onTab={onTab}
          title={Object.values(playgroundState.languages)[i]}
          data={tab.preprocessor}
          onchange={onLangChange}
          icon={'mr-1 fab fa-' + tab.icon + ' ' + tab.color}
        />
      </li>)}
    </ul>

    <ul className='h-100 d-flex align-center'>
      <li>
        <Dropdown
          title={playgroundState.template}
          data={Object.keys(templates)}
          onchange={onTemplateChange}
        />
      </li>

      <li>
        <Dropdown
          title={playgroundState.fontSize}
          data={fontSizes}
          onchange={onFontSize}
        />
      </li>

      <li>
        <Dropdown
          title={playgroundState.theme}
          data={themes}
          onchange={onTheme}
        />
      </li>

      {children}

      <li title='Save Paste' onClick={() => { setShowModal(!showModal); }}><i className='fa fa-save'></i></li>
      <li title='Show Profile'><Link to="/profile"><i className="fas fa-user text-white"></i></Link></li>
    </ul>

    <Modal showModal={showModal} setShowModal={setShowModal}>
      <FormSavePaste />
    </Modal>
  </header>
}
