import React, { useState, useEffect, useContext } from 'react';
import Tabs from '../components/Tabs';
import EditorAce from '../components/EditorAce';
import Split from 'react-split';

import { IframeUtil } from '../util/IframeUtil';
import jsBeauty from '../util/jsBeauty';

import './Editor.css';
import { GlobalContext } from '../state/GlobalState';
import templates from '../util/templates';
import DomUtil from '../util/DomUtil';
import { Link } from 'react-router-dom';

let localTabs = localStorage.getItem('kody-tabs');

export default function Editor ({ pasteContent }) {

  const { globalState } = useContext(GlobalContext);
  const [editorValue, setEditorValue] = useState('');
  const [logMessages, setLogMessages] = useState('');
  const [tabs, setTabs] = useState(localTabs ? JSON.parse(localTabs) : templates[globalState.template]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const onEditorChange = (value) => {
    setEditorValue(value);
    tabs[currentTabIndex] = value;
  }

  const getTabIndex = (currTabIndex) => {
    setCurrentTabIndex(currTabIndex);
    setEditorValue(tabs[currTabIndex]);
    localStorage.setItem('kody-tabs', JSON.stringify(tabs));
  }

  useEffect(() => {
    setEditorValue(pasteContent);
    setTabs([pasteContent, '', '']);
  }, [pasteContent]);

  useEffect(() => {
    let typeAsset = globalState.template;
    if (typeAsset === 'typescript') DomUtil.appendScript();
    else DomUtil.removeElement();
    setTabs(templates[typeAsset]);
    setEditorValue(templates[typeAsset][currentTabIndex]);
  }, [globalState.template]);

  const onRun = () => {
    let iframeUtil = new IframeUtil(globalState.template);

    let messages = [];
    iframeUtil.iframeWin.console.log = (...args) => {
      messages.push.apply(messages, [args]);
      setLogMessages(iframeUtil.formatOutput(messages));
    };

    iframeUtil.write(...tabs);
  }

  const onPrettier = () => {
    let lang = currentTabIndex === 0 ? 'html' : currentTabIndex === 1 ? 'css' : 'javascript';
    let r = jsBeauty(editorValue, lang);
    setEditorValue(r);
  }

  const onClearEditor = () => { setEditorValue(''); }

  return (
    <>
      <div className="playground">

        <header className="tabs">
          <Tabs getTabIndex={getTabIndex} />

          <div>                      
            <button className="btn btn-secondary btn-block"></button>

            <button className="btn btn-secondary btn-block"><i className="fas fa-compress"></i></button>

            <a className="btn btn-secondary btn-block" href="https://github.com/haikelfazzani/picode">
              <i className="fab fa-github"></i>
            </a>
          </div>

        </header>

        <Split split="vertical">
          <div className="editor">
            <EditorAce
              onEditorChange={onEditorChange}
              value={editorValue}
              lang={currentTabIndex}
              fontSize={+globalState.fontSize}
            />
            <div className="editor-menu">
              <button className="btn btn-secondary dsp-none" onClick={onClearEditor}><i className="fa fa-trash"></i></button>
              <button className="btn btn-secondary dsp-none" onClick={onPrettier}><i className="fa fa-stream"></i></button>
              <button className="btn btn-secondary" onClick={onRun}><i className="fa fa-play"></i></button>
            </div>
          </div>

          <div className="output pr-1">
            <Split gutterSize={10} sizes={[50, 50]} direction="vertical" minSize={40}>
              <div className="iframe-sandbox">
                <iframe title="Kody online web editor" id="sandbox"></iframe>
              </div>
              <EditorAce value={logMessages} readOnly={true} />
            </Split>
          </div>
        </Split>

      </div>
    </>
  );
}
