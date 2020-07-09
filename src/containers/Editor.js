import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Tabs from '../components/Tabs';
import EditorAce from '../components/EditorAce';
import Split from 'react-split';

import jsBeauty from '../util/jsBeauty';

import './Editor.css';
import templates from '../util/templates';

import DomUtil from '../util/DomUtil';
import { useParams } from 'react-router-dom';
import { DropboxService } from '../services/DropboxService';

export default function Editor () {

  let { id } = useParams();

  const { editorValue, consoleLogs, template } = useStoreState(state => state.editorModel);
  const { setEditorValue, runCode } = useStoreActions(actions => actions.editorModel)

  const [tabs, setTabs] = useState(templates[template]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(() => {
    DropboxService.downloadFile(id)
      .then(response => {
        if (response) {
          let reader = new FileReader();

          reader.onload = function () {
            if (this.result) {
              setEditorValue(this.result);
              setTabs([this.result, '', '']);
            }
          };

          reader.readAsText(response.fileBlob);
        }
      });
  }, [id]);

  useEffect(() => {
    if (template === 'typescript') DomUtil.appendScript();
    else DomUtil.removeElement();
    setEditorValue(templates[template][currentTabIndex]);
    setTabs(templates[template]);
  }, [template]);

  const onEditorChange = (value) => {
    setEditorValue(value);
    tabs[currentTabIndex] = value;
    localStorage.setItem('kody-tabs', JSON.stringify(tabs));
  }

  const getTabIndex = (currTabIndex) => {
    setCurrentTabIndex(currTabIndex);
    setEditorValue(tabs[currTabIndex]);
    localStorage.setItem('kody-tabs', JSON.stringify(tabs));
  }

  const onRun = () => {
    runCode({ template, tabs })
  }

  const onPrettier = () => {
    let lang = currentTabIndex === 0 ? 'html' : currentTabIndex === 1 ? 'css' : 'javascript';
    let r = jsBeauty(editorValue, lang);
    setEditorValue(r);
  }

  const onClearEditor = () => { setEditorValue(''); }

  return (
    <div className="playground">

      <Tabs getTabIndex={getTabIndex} />

      <Split split="vertical" gutterSize={5}>
        <div className="editor">
          <EditorAce
            onEditorChange={onEditorChange}
            value={editorValue}
            lang={currentTabIndex}
          />
          <div className="editor-menu">
            <button className="btn btn-secondary" onClick={onRun}><i className="fa fa-play"></i></button>
            <button className="btn btn-secondary dsp-none" onClick={onPrettier}><i className="fa fa-stream"></i></button>
            <button className="btn btn-secondary dsp-none" onClick={onClearEditor}><i className="fa fa-trash"></i></button>
          </div>
        </div>

        <div className="output">
          <Split gutterSize={5} sizes={[50, 50]} direction="vertical" minSize={40}>
            <div className="iframe-sandbox">
              <iframe title="Kody online web editor" id="sandbox"></iframe>
            </div>
            <EditorAce value={consoleLogs} readOnly={true} />
          </Split>
        </div>
      </Split>

    </div>
  );
}
