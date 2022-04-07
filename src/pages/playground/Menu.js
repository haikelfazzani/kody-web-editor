import React, { useContext, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlaygroundContext } from '../../store/PlaygroundProvider';
import Dropdown from '../../components/DropDown';

import templates from '../../util/templates/index';
import Preprocessor from '../../util/Preprocessor';
import tabsToHTML from '../../util/tabsToHTML';
import download from '../../util/download';
import Modal from '../../components/Modal';
import FormSavePaste from './menu/FormSavePaste';
import Settings from './menu/Settings';

const tabs = [
  { name: 'html', icon: 'html5', color: 'red', preprocessor: ['html'] },
  { name: 'css', icon: 'css3', color: 'blue', preprocessor: ['css', 'less', 'sass'] },
  {
    name: 'javascript', icon: 'js', color: 'yellow', preprocessor: [
      'javascript', 'babel', 'typescript', 'coffeescript', 'babel+typescript'
    ]
  }
];

export default function Menu() {
  const { playgroundState, dispatch } = useContext(PlaygroundContext);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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

  const onDownload = () => {
    const tabs = JSON.parse(localStorage.getItem('tabs'));
    const html = tabsToHTML(tabs);
    download(html, 'kody.html');
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

      <li title="Download Code" onClick={onDownload}><i className="fa fa-download"></i></li>
      <li title='Save Paste' onClick={() => { setShowSaveModal(!showSaveModal); }}><i className='fa fa-save'></i></li>
      <li title='Settings' onClick={() => { setShowSettingsModal(!showSettingsModal); }}><i className='fa fa-cog'></i></li>
      <li title='Show Profile'><Link to="/profile"><i className="fas fa-user text-white"></i></Link></li>
    </ul>

    <Modal showModal={showSettingsModal} setShowModal={setShowSettingsModal}>
      <Settings />
    </Modal>

    <Modal showModal={showSaveModal} setShowModal={setShowSaveModal}>
      <FormSavePaste />
    </Modal>
  </header>
}
