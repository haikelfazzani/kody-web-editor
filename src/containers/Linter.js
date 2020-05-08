import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import linterUtil from '../util/linterUtil';

const initState = {
  tabs: [
    { name: 'Linter', code: '', id: 0, icon: 'fa fa-bug' },
    { name: 'Babel', code: '', id: 1, icon: 'fa fa-globe' },
    { name: 'Prefixer', code: '', id: 2, icon: 'fab fa-css3' },
    { name: 'Console', code: '', id: 3, icon: 'fa fa-terminal' }
  ],
  currentTabId: 0,
  currentTabContent: ''
};

export default function Linter ({ jsValue, cssVal }) {

  const [state, setState] = useState(initState);

  const onTabClick = useCallback((currentTabId) => {
    let currentTabContent = state.tabs.find(tab => tab.id === currentTabId).code;
    setState({ ...state, currentTabId, currentTabContent });
  }, []);

  useEffect(() => {
    if (state.currentTabId === 3) {
      window.addEventListener('message', (msg) => {
        if (msg) {
          state.tabs[3].code = msg.data;
          setState({ ...state, currentTabContent: msg.data });
        }
      })
    }


    linterUtil(state.currentTabId, jsValue, cssVal)
      .then(result => {
        state.tabs[state.currentTabId].code = result;
        setState({ ...state, currentTabContent: result });
      })
      .catch(e => {
        state.tabs[state.currentTabId].code = e;
        setState({ ...state, currentTabContent: e });
      });

  }, [jsValue, cssVal, state.currentTabId]);

  return <div className="linter">
    <header>
      <div className="tabs">
        <div>
          {state.tabs.map((tab, i) =>
            <span
              className={"tab " + (state.currentTabId === i ? "active-tab" : "")}
              key={tab.name}
              onClick={() => { onTabClick(i) }}>
              <i className={'mr-2 ' + tab.icon}></i>
              <span className="tab-title">{tab.name}</span>
            </span>)}
        </div>
      </div>
    </header>

    <div className="linter-output">
      <Editor value={state.currentTabContent} readOnly={true} />
    </div>
  </div>
}
