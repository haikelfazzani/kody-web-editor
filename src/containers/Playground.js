import React, { useState, useRef, useCallback, useEffect } from 'react';

import Editor from '../components/Editor';
import Split from 'react-split';

import Linter from './Linter';
import writeContent from '../util/iframe';

import jsBeauty from '../util/jsBeauty';
import { useStoreState } from 'easy-peasy';
import AppUtil from '../util/AppUtil';

export default function Playground () {

  const { libraries, isSassEnabled } = useStoreState(state => state.webeditor.model);
  const iframe = useRef();
  const [editorVal, setEditorVal] = useState(AppUtil.getCurrentTabCode());
  const [tabsState, setTabsState] = useState(AppUtil.getTabState());

  const [linterValues, setLinterValues] = useState({
    jsValue: '',
    cssVal: ''
  });

  const onEditorChange = (v, e, data) => {

    setEditorVal(data);
    tabsState.tabs.find(t => t.index === tabsState.activeTabIndex).code = data;

    if (tabsState.activeTabIndex === 2 || tabsState.activeTabIndex === 1) {
      setLinterValues({ cssVal: tabsState.tabs[1].code, jsValue: tabsState.tabs[2].code });
    }

    localStorage.setItem('kody-tabs', JSON.stringify(tabsState));
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

  const runCode = async () => {
    let iframeDoc = iframe.current.contentWindow.document;

    let content = await writeContent(
      tabsState.tabs[0].code, // html
      tabsState.tabs[1].code, // css
      tabsState.tabs[2].code, // javasript
      libraries,
      isSassEnabled // enable sass
    );

    iframeDoc.open().write(content);
    iframeDoc.close();
  }


  useEffect(() => {
    document.addEventListener('keydown', async (event) => {
      if (event.ctrlKey && event.keyCode === 13) {
        await runCode();
      }

      if (event.ctrlKey && event.altKey && event.keyCode === 70) {
        beautifyCode();
      }
    });
  }, []);

  useEffect(() => {
    let data = window.location.search.split('?bin=')[1];
    if (data) {
      let decodedData = JSON.parse(window.atob(data));
      setTabsState(decodedData);
    }
  }, []);

  return (
    <Split gutterSize={10} sizes={[50, 50]} minSize={150}>
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
        <Split gutterSize={10} sizes={[50, 50]} direction="vertical" minSize={40}>

          <div>
            <header className="tabs overflow-auto">
              <span className="tab active-tab"><i className="fa fa-eye mr-2"></i> View</span>
            </header>
            <iframe ref={iframe} title="kody web editor" id="kody-iframe"></iframe>
          </div>

          <Linter jsValue={linterValues.jsValue} cssVal={linterValues.cssVal} />
        </Split>
      </div>

    </Split>
  );
}