import React, { useState, useRef, useCallback, useEffect } from 'react';

import Editor from '../components/Editor';
import Split from 'react-split';

import Linter from './Linter';
import writeContent from '../util/iframe';

import jsBeauty from '../util/jsBeauty';
import { useStoreState } from 'easy-peasy';

let local = localStorage.getItem('reacto-web-editor');
let initTabState = local ? JSON.parse(local) : {
  tabs: [
    { name: 'Index.html', lang: 'htmlmixed', index: 0, code: '', icon: 'fab fa-html5' },
    { name: 'Style.css', lang: 'css', index: 1, code: '', icon: 'fab fa-css3' },
    { name: 'App.js', lang: 'javascript', index: 2, code: '', icon: 'fab fa-js' }
  ],
  activeTabIndex: 0
};

let initEditorVal = initTabState.tabs[initTabState.activeTabIndex].code;

export default function Playground () {

  const iframe = useRef();
  const [editorVal, setEditorVal] = useState(initEditorVal);
  const [tabsState, setTabsState] = useState(initTabState);
  const { libraries } = useStoreState(state => state.webeditor.model);

  const [jsValue, setJsValue] = useState(null);

  const onEditorChange = (v, e, data) => {
    setEditorVal(data);
    tabsState.tabs.find(t => t.index === tabsState.activeTabIndex).code = data;
    if (tabsState.activeTabIndex === 2) { setJsValue(tabsState.tabs[2].code); }
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

    let content = writeContent(
      tabsState.tabs[0].code,
      tabsState.tabs[1].code,
      tabsState.tabs[2].code,
      libraries
    );

    iframeDoc.open().write(content);
    iframeDoc.close();
  }

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.keyCode === 13) {
        runCode();
      }

      if (event.ctrlKey && event.altKey && event.keyCode === 70) {
        beautifyCode();
      }
    });
  }, []);

  useEffect(() => {
    let data = window.location.search.split('?w=')[1];
    if (data) {
      let decodedData = JSON.parse(window.atob(data));
      setTabsState(decodedData);
    }
  }, []);

  return (
    <>
      <div>
        <header className="tabs overflow-auto">
          <div>
            {tabsState.tabs.map(tab => (
              <span
                className={'tab ' + (tabsState.activeTabIndex === tab.index ? 'active-tab' : '')}
                key={'wtab' + tab.index} onClick={() => { onClickTab(tab.index); }}>
                <div>
                  <i className={tab.icon}></i>
                  <span className="tab-title ml-2">{tab.name}</span>
                </div>
              </span>
            ))}
          </div>

          <div>
            <button onClick={beautifyCode} className="btn btn-outline-light"><i className="fa fa-stream"></i></button>
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
    </>
  );
}