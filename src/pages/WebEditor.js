import React, { useState, useRef, useCallback } from 'react';
import Editor from '../components/Editor';
import Navbar from '../containers/Navbar';
import Split from 'react-split';

import Linter from '../containers/Linter';
import writeContent from '../util/iframe';

import '../styles/Tabs.css';
import '../styles/WebEditor.css';

let local = localStorage.getItem('reacto-web-editor');
let initTabState = local ? JSON.parse(local) : {
  tabs: [
    { name: 'index.html', lang: 'htmlmixed', index: 0, code: '' },
    { name: 'style.css', lang: 'css', index: 1, code: '' },
    { name: 'app.js', lang: 'javascript', index: 2, code: '' }
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

    let iframeDoc = iframe.current.contentWindow.document;
    let content = writeContent(tabsState.tabs[0].code, tabsState.tabs[1].code, tabsState.tabs[2].code);
    iframeDoc.open().write(content);
    iframeDoc.close();

    if(tabsState.activeTabIndex === 2) { setJsValue(tabsState.tabs[2].code) }
    
    localStorage.setItem('reacto-web-editor', JSON.stringify(tabsState));
  }

  const onClickTab = useCallback((activeTabIndex) => {
    let tab = tabsState.tabs[activeTabIndex];
    setEditorVal(tab.code);
    setTabsState({ ...tabsState, activeTabIndex });
  }, []);

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
                  <div onClick={() => { onClickTab(tab.index); }}>{tab.name}</div>
                </span>
              ))}
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