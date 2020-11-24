import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import EditorAce from '../components/EditorAce';
import Split from 'react-split';

import jsBeauty from '../util/jsBeauty';

import './Editor.css';
import templates from '../util/templates';

import DomUtil from '../util/DomUtil';
import { Link, useParams } from 'react-router-dom';
import PasteService from '../services/PasteService';
import Settings from '../components/sidebar/Settings';

const edFiles = [
  { name: 'Index.html', icon: 'html5', color: 'text-danger' },
  { name: 'Style.css', icon: 'css3', color: 'text-primary' },
  { name: 'App.js', icon: 'js', color: 'text-warning' }
];

const EditorFiles = ({ getFileIndex }) => {

  const [currEdFileIndex, setcurrEdFileIndex] = useState(0);

  const setEdFileIndex = (currIndex) => {
    getFileIndex(currIndex);
    setcurrEdFileIndex(currIndex)
  }

  return <ul className="list-group d-flex">
    <li className="d-flex align-items-center list-group-item">
      <Link to="/"><i className="fas fa-home text-white"></i></Link>
    </li>
    {edFiles.map((tab, i) => <li
      className={"d-flex align-items-center list-group-item " + (currEdFileIndex === i ? 'active-tab' : '')}
      onClick={() => { setEdFileIndex(i) }}
      key={'tab' + i}><i className={tab.color + " mr-2 fab fa-" + tab.icon}></i> {tab.name}
    </li>)}
  </ul>
}

export default function Editor () {

  let { service, id } = useParams();

  const { editorValue, consoleLogs, template, resources } = useStoreState(state => state.editorModel);
  const { setEditorValue, setConsoleLogs, runCode } = useStoreActions(actions => actions.editorModel)

  const [tabs, setTabs] = useState(templates[template]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    if (service && id && id.length > 0) {
      PasteService.getContent(service, id)
        .then(r => {
          setEditorValue(r);
          setTabs([r, '', '']);
        });
    }
  }, [service, id]);

  useEffect(() => {
    (template === 'typescript') ? DomUtil.appendScript() : DomUtil.removeElement();
    setEditorValue(templates[template][currentTabIndex]);
    setTabs(templates[template]);

    window.addEventListener('message', function (e) {
      if (e && e.data && e.data.message) {
        setConsoleLogs(e.data.message + '\n' + e.data.stack);
      }
    }, false);
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
    runCode({ template, tabs, resources });
  }

  const onPrettier = () => {
    let lang = currentTabIndex === 0 ? 'html' : currentTabIndex === 1 ? 'css' : 'javascript';
    let r = jsBeauty(editorValue, lang);
    setEditorValue(r);
  }

  const onShowConsole = () => { setShowConsole(!showConsole); }
  const onClearConsole = () => { setConsoleLogs(''); }

  return (
    <div className="playground">

      <header>
        <EditorFiles getFileIndex={getTabIndex} />
        <Settings />        
      </header>

      <Split direction="horizontal" cursor="col-resize" gutterSize={7}>

        <div className="editor">

          <EditorAce
            onEditorChange={onEditorChange}
            value={editorValue}
            lang={currentTabIndex}
          />

          <div className="btn-group">
            <button className="btn btn-primary" onClick={onRun}><i className="fa fa-play"></i></button>
            <button className="btn btn-primary" onClick={onPrettier}><i className="fa fa-stream"></i></button>
            <button className="btn btn-primary" onClick={onShowConsole}><i className="fa fa-terminal"></i></button>
          </div>
        </div>

        <div className="output">

          <Split direction="vertical" cursor="row-resize"
            gutterSize={7}
            sizes={showConsole ? [50, 50] : [100, 0]}
            minSize={showConsole ? 70 : 0}>

            <div className="iframe-sandbox">
              <iframe title="Kody online web editor" id="sandbox"></iframe>
            </div>

            <div className="w-100 console" style={{ display: showConsole ? 'block' : 'none' }}>
              <div className="console-header fs-12 text-uppercase">
                <p className="m-0"><i className="fa fa-terminal mr-2"></i><span>console</span></p>

                <div className="d-flex">
                  <button onClick={onClearConsole} className="btn-inherit">
                    <i className="fa fa-eraser"></i>
                  </button>

                  <button onClick={onShowConsole} className="btn-inherit ml-3">
                    <i className="fa fa-times-circle"></i>
                  </button>
                </div>
              </div>
              <pre>{consoleLogs}</pre>
            </div>
          </Split>

        </div>

      </Split>

    </div>
  );
}
