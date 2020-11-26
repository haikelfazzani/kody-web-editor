import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import EditorAce from '../components/EditorAce';
import Split from 'react-split';
import Tabs from './Tabs';
import jsBeauty from '../util/jsBeauty';

import templates from '../util/templates';

import PasteService from '../services/PasteService';
import './Editor.css';

const Settings = React.lazy(() => import('./settings/Settings'));

export default function Editor (props) {

  let { service, id } = useParams();

  const { preprocessors, editorValue, consoleLogs, template, resources } = useStoreState(state => state.editorModel);
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
        })
        .catch(e => {
          props.history.push('/');
        });
    }
  }, [service, id]);

  useEffect(() => {
    window.addEventListener('message', function (e) {
      if (e && e.data && e.data.message) {
        setConsoleLogs(e.data.message + '\n' + e.data.stack);
      }
    }, false);

    setEditorValue(templates[template][currentTabIndex]);
    setTabs(templates[template]);
  }, [template]);

  useEffect(() => {
    if (resources.length > 0) {
      tabs[0] = resources[0] + '\n' + tabs[0];
      setEditorValue(tabs[currentTabIndex]);
    }
  }, [resources]);

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
    runCode({ tabs, preprocessors });
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
        <Tabs getFileIndex={getTabIndex} />
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
            <button className="btn btn-primary" title="Run Code" onClick={onRun}><i className="fa fa-play"></i></button>
            <button className="btn btn-primary" title="Format Code" onClick={onPrettier}><i className="fa fa-stream"></i></button>
            <button className="btn btn-primary" title="Show Console" onClick={onShowConsole}><i className="fa fa-terminal"></i></button>
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
