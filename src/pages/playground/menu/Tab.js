import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tabState from '../../../atoms/tabState';

import Dropdown from '../../../components/DropDown';
import Preprocessor from '../../../util/Preprocessor'

const tabs = [
  { name: 'html', icon: 'html5', color: 'red', preprocessor: ['html'] },
  { name: 'css', icon: 'css3', color: 'blue', preprocessor: ['css', 'less', 'sass'] },
  {
    name: 'javascript', icon: 'js', color: 'yellow', preprocessor: [
      'javascript', 'babel', 'typescript', 'coffeescript', 'babel+typescript'
    ]
  }
];

export default function Tab() {
  const state = useRecoilValue(tabState);
  const setTab = useSetRecoilState(tabState);

  const onLangChange = (language, index) => {
    const languages = Object.assign({}, state.languages);
    const name = Object.keys(languages)[index];
    languages[name] = language;

    setTab(old => {
      return {
        ...old,
        languages
      }
    });
    Preprocessor.loadCDN(language);
  }

  const onTab = useCallback(tabIndex => {
    setTab(old => {
      return {
        ...old,
        tabIndex
      }
    });
  }, []);

  return <ul className='h-100 d-flex align-center'>
    <li><i className="fas fa-circle text-white"></i></li>
    {tabs.map((tab, i) => <li key={tab.name} className={state.tabIndex === i ? 'active-tab' : ''}>
      <Dropdown
        index={i}
        onTab={onTab}
        title={Object.values(state.languages)[i]}
        data={tab.preprocessor}
        onchange={onLangChange}
        icon={'mr-1 fab fa-' + tab.icon + ' ' + tab.color}
      />
    </li>)}
  </ul>
}
