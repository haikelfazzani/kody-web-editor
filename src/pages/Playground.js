import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';

import { IframeUtil } from '../util/IframeUtil'

import Split from 'react-split';
import jsBeauty from '../util/jsBeauty';
import templates from '../util/templates';
import Dropdown from '../components/DropDown';
import DomUtil from '../util/DomUtil';

import '../styles/Playground.css';
import Settings from '../containers/Settings';

const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

const tabFiles = [
  { name: 'Index.html', type: 'html', icon: 'html5', color: 'red', preprocessor: ['html'] },
  { name: 'Style.css', type: 'css', icon: 'css3', color: 'blue', preprocessor: ['css', 'less', 'sass'] },
  {
    name: 'App.js', type: 'js', icon: 'js', color: 'yellow',
    preprocessor: ['javascript', 'babel', 'typescript', 'coffeescript']
  }
];

const localState = localStorage.getItem('kody-state') ? JSON.parse(localStorage.getItem('kody-state')) : null;

function Playground(props) {
  let { id } = useParams();

  const editorRef = useRef();
  const [aceEditor, setAceEditor] = useState()

  const [consoleLogs, setConsoleLogs] = useState('')
  const [showConsole, setShowConsole] = useState(true);

  const tabdIndexRef = useRef(localState ? localState.tabIndex : 0);

  const [state, setState] = useState({
    tabs: localState ? localState.tabs : templates['vanilla'],
    preprocessors: { html: 'html', css: 'css', js: 'javascript' },
    template: 'vanilla'
  })

  const eoptions = {
    enableBasicAutocompletion: true,
    enableSnippets: false,
    enableLiveAutocompletion: true,
    highlightActiveLine: true,
    wrapBehavioursEnabled: true,
    showPrintMargin: true,
    showGutter: true,
    highlightGutterLine: true,
    fontSize: 16,
    theme: 'ace/theme/monokai',
    useWorker: false,
    tabSize: 4,
    mode: 'ace/mode/html'
  }

  useEffect(() => {
    let element = editorRef.current;

    if (!aceEditor && element && window.ace) {
      const editor = window.ace.edit(element);

      editor.setValue(state.tabs[tabdIndexRef.current], 1);
      editor.setOptions(eoptions);
      setAceEditor(editor);

      editor.getSession().on('change', () => {
        let val = editor.session.getValue();

        const temp = state.tabs.slice(0);
        temp[tabdIndexRef.current] = val;

        const newState = { ...state, tabIndex: tabdIndexRef.current, tabs: temp };
        setState(newState);
        localStorage.setItem('kody-state', JSON.stringify(newState));
      });
    }
  }, []);

  const onRun = () => {
    let ifu = new IframeUtil(state.preprocessors);

    let messages = [];
    ifu.iframeWin.console.log = (...args) => {
      messages.push.apply(messages, [args]);
      setConsoleLogs(ifu.formatOutput(messages));
    };

    ifu.write(...state.tabs, err => {
      if (err) { setConsoleLogs(err); }
    });
  }

  const onPrettier = () => {
    let lang = tabdIndexRef.current === 0 ? 'html' : tabdIndexRef.current === 1 ? 'css' : 'javascript';
    let val = jsBeauty(state.tabs[tabdIndexRef.current], lang);
    const temp = state.tabs.slice(0);
    temp[tabdIndexRef.current] = val;

    aceEditor.setValue(val, 1);
    setState({ ...state, tabs: temp });
  }

  const onShowConsole = () => { setShowConsole(!showConsole); }
  const onClearConsole = () => { setConsoleLogs(''); }

  const onTab = (preprocessor, tab, tabIndex) => {
    if (preprocessor !== 'html' || preprocessor !== 'css' || preprocessor !== 'javascript') {
      DomUtil.appendScript(preprocessor);
    }
    tabdIndexRef.current = tabIndex;

    let mode = preprocessor;
    if (/coff|babel/gi.test(preprocessor)) mode = 'javascript';

    aceEditor.setValue(state.tabs[tabIndex], 1);
    aceEditor.setOptions({ ...eoptions, mode: 'ace/mode/' + mode });

    const temp = state.tabs.slice(0);

    const newStat = {
      ...state,
      tabs: temp,
      preprocessors: { ...state.preprocessors, [tab.type]: preprocessor },
      tabIndex
    };

    setState(newStat);
    localStorage.setItem('kody-state', JSON.stringify(newStat));
  }

  const onTemplate = (template) => {
    if (/react/gi.test(template)) {
      DomUtil.appendScript('babel');
    }

    aceEditor.setValue(templates[template][tabdIndexRef.current], 1);
    setState({ ...state, tabs: templates[template], template });
  }

  return (
    <div className="playground">
      <header className='w-100 d-flex justify-between align-center'>
        <ul className='h-100 d-flex align-center'>
          <li><Link to="/"><i className="fas fa-home text-white"></i></Link></li>
          {tabFiles.map((tab, i) => <Dropdown
            key={i}
            icon={'mr-1 fab fa-' + tab.icon}
            onclick={(p) => { onTab(p, tab, i) }}
            data={tab.preprocessor}
            color={tab.color}
            clx={tabdIndexRef.current === i ? 'active-tab' : ''}
          />)}
        </ul>

        <ul className='h-100 d-flex align-center'>
          <Settings />
          <Dropdown
            icon={'mr-1 fab fa-user'}
            color=""
            onclick={(p) => { onTemplate(p) }}
            data={Object.keys(templates)}
          />
          <li>profile</li>
        </ul>
      </header>

      <Split minSize={0} direction={isMobile ? "vertical" : "horizontal"} cursor="col-resize" gutterSize={7}>
        <div className="editor">
          <div className='w-100 h-100' ref={editorRef}></div>

          <div className="btn-group">
            <button className="btn" title="Run Code" onClick={onRun}><i className="fa fa-play"></i></button>
            <button className="btn" title="Format Code" onClick={onPrettier}><i className="fa fa-stream"></i></button>
            <button className="btn" title="Show Console" onClick={onShowConsole}><i className="fa fa-terminal"></i></button>
          </div>
        </div>

        <Split direction="vertical" cursor="row-resize"
          gutterSize={7}
          sizes={showConsole ? [50, 50] : [100, 0]}
          minSize={showConsole ? 70 : 0}>

          <div className="iframe-sandbox">
            <iframe title="Kody online web editor" id="sandbox"></iframe>
          </div>

          <div className="w-100 console" style={{ display: showConsole ? 'block' : 'none' }}>
            <div className="console-header text-uppercase">
              <p className="m-0"><i className="fa fa-terminal mr-2"></i><span>console</span></p>

              <div className="d-flex align-center">
                <button onClick={onClearConsole} className="white mr-1"><i className="fa fa-eraser"></i></button>
                <button onClick={onShowConsole} className="white"><i className="fa fa-times-circle"></i></button>
              </div>
            </div>
            
            <pre>{consoleLogs}</pre>
          </div>
        </Split>
      </Split>
    </div>
  );
}

export default withRouter(Playground);