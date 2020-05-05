import React, { useState, useRef, useEffect } from 'react';
import Editor from '../components/Editor';
import Navbar from '../containers/Navbar';
import Split from 'react-split';

import '../styles/Tabs.css';
import '../styles/WebEditor.css';
import writeContent from '../util/iframe';

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

  const [cs, setCs] = useState([]);

  const onEditorChange = (v,e,data) => {

    setEditorVal(data);
    tabsState.tabs.find(t => t.index === tabsState.activeTabIndex).code = data;

    let iframeDoc = iframe.current.contentWindow.document;
    let content = writeContent(tabsState.tabs[0].code, tabsState.tabs[1].code, tabsState.tabs[2].code);
    iframeDoc.open().write(content);
    iframeDoc.close();

    iframe.current.contentWindow.console.log = (args) => {
      console.log(args);
      setCs([...cs, args])
    }
    
    localStorage.setItem('reacto-web-editor', JSON.stringify(tabsState));
  }

  const onClickTab = (activeTabIndex) => {
    let tab = tabsState.tabs[activeTabIndex];
    setEditorVal(tab.code);
    setTabsState({ ...tabsState, activeTabIndex });
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

        <div>
          <header className="tabs overflow-auto">
            <span className="tab active-tab">Output</span>
          </header>

          <iframe ref={iframe} title="web editor"></iframe>
        </div>
      </Split>
    </main>
  </>;
}