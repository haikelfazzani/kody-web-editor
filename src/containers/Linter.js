import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';

const initState = {
  tabs: [
    { name: 'Linter', code: '', id: 0, icon: 'bug' },
    { name: 'Babel', code: '', id: 1, icon: 'globe' },
    { name: 'Console', code: '', id: 2, icon: 'terminal' }
  ],
  currentTabId: 0,
  currentTabContent: ''
};

const Linter = ({ jsValue }) => {

  const [state, setState] = useState(initState);

  const onTabClick = (currentTabId) => {
    let currentTabContent = state.tabs.find(tab => tab.id === currentTabId).code;
    setState({ ...state, currentTabId, currentTabContent });
  }

  useEffect(() => {
    switch (state.currentTabId) {
      case 2:
        window.addEventListener('message', (msg) => {
          if (msg) {
            state.tabs[2].code = msg.data;
            setState({ ...state, currentTabContent: msg.data });
          }
        })
        break;

      case 1:
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
        break;

      default:
        // JShint errors
        window.JSHINT(jsValue, { asi: true, lastsemic: false, esnext: true });

        let res = window.JSHINT.errors.reduce((a, e) => {
          a += `line ${e.line}: ${e.reason} \n`;
          return a
        }, '');

        state.tabs[0].code = res;
        setState({ ...state, currentTabContent: res });
        break;
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

export default Linter;