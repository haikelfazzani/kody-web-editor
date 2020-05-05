import React, { useState, useRef, useCallback } from 'react';
import Editor from '../components/Editor';
import Navbar from '../containers/Navbar';
import Split from 'react-split';

import Linter from '../containers/Linter';
import writeContent from '../util/iframe';

import '../styles/Tabs.css';
import '../styles/WebEditor.css';
import jsBeauty from '../util/jsBeauty';

let local = localStorage.getItem('reacto-web-editor');
let initTabState = local ? JSON.parse(local) : {
  tabs: [
    { name: 'Index.html', lang: 'htmlmixed', index: 0, code: '', icon:'fab fa-html5' },
    { name: 'Style.css', lang: 'css', index: 1, code: '', icon:'fab fa-css3' },
    { name: 'App.js', lang: 'javascript', index: 2, code: '', icon:'fab fa-js' }
  ],
  activeTabIndex: 0
};

let initEditorVal = initTabState.tabs[initTabState.activeTabIndex].code;

export default function WebEditor () {

  const iframe = useRef();
  const [editorVal, setEditorVal] = useState(initEditorVal);
  const [tabsState, setTabsState] = useState(initTabState);

  const [jsValue, setJsValue] = useState(null);

  const onEditorChange = (v, e, data) => {
    setEditorVal(data);
    tabsState.tabs.find(t => t.index === tabsState.activeTabIndex).code = data;
    localStorage.setItem('reacto-web-editor', JSON.stringify(tabsState));
  }

  const onClickTab = useCallback((activeTabIndex) => {
    let tab = tabsState.tabs[activeTabIndex];
    setEditorVal(tab.code);
    setTabsState({ ...tabsState, activeTabIndex });
  }, []);

  const beautifyCode = () => {
    let tab = tabsState.tabs[tabsState.activeTabIndex];
    let res = jsBeauty(tab.code, tab.lang);
    setEditorVal(res);
  }

  const runCode = () => {
    let iframeDoc = iframe.current.contentWindow.document;
    let content = writeContent(tabsState.tabs[0].code, tabsState.tabs[1].code, tabsState.tabs[2].code);
    iframeDoc.open().write(content);
    iframeDoc.close();
    if (tabsState.activeTabIndex === 2) { setJsValue(tabsState.tabs[2].code) }
  }

  return <>
    <Navbar />

    <main>

      <Split gutterSize={10} sizes={[50, 50]}>

        <div>
          <header className="tabs overflow-auto">
            <div>
              {tabsState.tabs.map(tab => (
                <span
                  className={'tab ' + (tabsState.activeTabIndex === tab.index ? 'active-tab' : '')}
                  key={'wtab' + tab.index}>
                  <div onClick={() => { onClickTab(tab.index); }}>
                    <i className={tab.icon + ' mr-2'}></i><span className="tab-title">{tab.name}</span>
                  </div>
                </span>
              ))}
            </div>

            <div>
              <button onClick={beautifyCode} className="btn btn-outline-light"><i className="fa fa-list"></i></button>
              <button onClick={runCode} className="btn btn-outline-light"><i className="fa fa-play"></i></button>
            </div>
          </header>

          <Editor
            onChange={onEditorChange}
            value={editorVal}
            lang={tabsState.tabs[tabsState.activeTabIndex].lang}
          />
        </div>

        <div className="editor-output">
          <header className="tabs overflow-auto">
            <span className="tab active-tab"><i className="fa fa-circle mr-2"></i> Output</span>
          </header>

          <Split gutterSize={10} sizes={[50, 50]} direction="vertical" minSize={30}>
            <iframe ref={iframe} title="web editor"></iframe>
            <Linter jsValue={jsValue} />
          </Split>
        </div>
      </Split>
    </main>
  </>;
}