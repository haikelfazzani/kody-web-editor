import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import jshint from '../util/jshint';

const initState = {
  tabs: [
    { name: 'Linter', code: '', id: 0, icon: 'bug' },
    { name: 'Babel', code: '', id: 1, icon: 'globe' },
    { name: 'Console', code: '', id: 2, icon: 'terminal' }
  ],
  currentTabId: 0,
  currentTabContent: ''
};

export default function Linter ({ jsValue }) {

  const [state, setState] = useState(initState);

  const onTabClick = useCallback((currentTabId) => {
    let currentTabContent = state.tabs.find(tab => tab.id === currentTabId).code;
    setState({ ...state, currentTabId, currentTabContent });
  }, []);

  useEffect(() => {
    if (state.currentTabId === 2) {
      window.addEventListener('message', (msg) => {
        if (msg) {
          state.tabs[2].code = msg.data;
          setState({ ...state, currentTabContent: msg.data });
        }
      })
    }

    if (state.currentTabId === 1) {
      // babel transpiler
      let output = '';
      try {
        output = window.Babel.transform(jsValue, {
          envName: 'production',
          presets: ['react', 'es2015']
        }).code;

        state.tabs[1].code = output;
        setState({ ...state, currentTabContent: output });
      } catch (error) {
        state.tabs[1].code = error.message;
        setState({ ...state, currentTabContent: error.message });
      }
    }

    if (state.currentTabId === 0) {
      // JShint errors
      if (jsValue) {
        let res = jshint(jsValue);
        state.tabs[0].code = res;
        setState({ ...state, currentTabContent: res });
      }
    }
  }, [jsValue, state.currentTabId]);

  return <div className="linter">
    <header>
      <div className="tabs">
        <div>
          {state.tabs.map((tab, i) =>
            <span
              className={"tab " + (state.currentTabId === i ? "active-tab" : "")}
              key={tab.name}
              onClick={() => { onTabClick(i) }}>
              <i className={'mr-2 fa fa-' + tab.icon}></i><span className="tab-title">{tab.name}</span>
            </span>)}
        </div>
      </div>
    </header>

    <div className="linter-output">
      <Editor value={state.currentTabContent} readOnly={true} />
    </div>
  </div>
}
