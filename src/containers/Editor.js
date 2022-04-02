import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import { PlaygroundContext } from '../store/playgroundStore';

import { IframeUtil } from '../util/IframeUtil'

import Split from 'react-split';
import jsBeauty from '../util/jsBeauty';
import templates from '../util/templates';
import Dropdown from '../components/DropDown';
import Preprocessor from '../util/Preprocessor';

import '../styles/Playground.css';
import Settings from '../containers/Settings';

import AceEditor from "react-ace";

const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

const tabs = [
  { name: 'html', icon: 'html5', color: 'red', preprocessor: ['html'] },
  { name: 'css', icon: 'css3', color: 'blue', preprocessor: ['css', 'less', 'sass'] },
  {
    name: 'javascript', icon: 'js', color: 'yellow', preprocessor: [
      'javascript', 'babel', 'typescript', 'coffeescript', 'babel+typescript'
    ]
  }
];

let tabsContent = localStorage.getItem('tabs-content')
  ? JSON.parse(localStorage.getItem('tabs-content'))
  : ['<h1>sdsd</h1>', 'body { background: red;}', 'console.log(1)'];

function Editor(props) {
  let { id } = useParams();

  const [editorVal, setEditorVal] = useState(tabsContent);
  
  const [config, setConfig] = useState(() => {
    const local = localStorage.getItem('config')
    const n = local ? JSON.parse(local) : {
      template: 'vanilla',
      languages: { html: 'html', css: 'css', javascript: 'javascript' }
    }
    
    Preprocessor.appendToDOM(n.languages.javascript)
    return n;
  });  

  const [consoleLogs, setConsoleLogs] = useState('');
  const [showConsole, setShowConsole] = useState(true);

  const onEditorValueChange = value => {
    const temp = editorVal.slice(0);
    temp[config.tabIndex] = value;
    setEditorVal(temp);
    localStorage.setItem('tabs-content', JSON.stringify(temp))
  }

  const onRun = () => {
    let ifu = new IframeUtil(config.languages);

    let messages = [];
    ifu.iframeWin.console.log = (...args) => {
      messages.push.apply(messages, [args]);
      setConsoleLogs(ifu.formatOutput(messages));
    };

    ifu.write(...editorVal, err => {
      if (err) { setConsoleLogs(err); }
    });
  }

  const onTab = (lang, tab, tabIndex) => {
    Preprocessor.loadScript(lang)

    const newConfig = {
      ...config,
      tabIndex,
      languages: { ...config.languages, [tab.name]: lang }
    }
    setConfig(newConfig);
    localStorage.setItem('config', JSON.stringify(newConfig));
  }

  const onTemplate = (template) => {
    const newConfig = { ...config, template }
    setEditorVal(templates[template]);
    setConfig(newConfig);
    localStorage.setItem('tabs-content', JSON.stringify(templates[template]));
    localStorage.setItem('config', JSON.stringify(newConfig));
  }

  const onPrettier = () => {
    // let lang = tabdIndexRef.current === 0 ? 'html' : tabdIndexRef.current === 1 ? 'css' : 'javascript';
    // let val = jsBeauty(playgroundState.tabs[tabdIndexRef.current], lang);
    // const temp = playgroundState.tabs.slice(0);
    // temp[tabdIndexRef.current] = val;

    // setPlaygroundState({ ...playgroundState, tabs: temp });
  }

  const onShowConsole = () => { setShowConsole(!showConsole); }
  const onClearConsole = () => { setConsoleLogs(''); }

  return <div className="playground">
    <header className='w-100 d-flex justify-between align-center'>
      <ul className='h-100 d-flex align-center'>
        <li><Link to="/"><i className="fas fa-home text-white"></i></Link></li>
        {tabs.map((tab, i) => <Dropdown
          key={i}
          icon={'mr-1 fab fa-' + tab.icon}
          onclick={(p) => { onTab(p, tab, i) }}
          data={tab.preprocessor}
          color={tab.color}
          title={Object.values(config.languages)[i]}
          clx={config.tabIndex === i ? 'active-tab' : ''}
        />)}
      </ul>

      <ul className='h-100 d-flex align-center'>
        <Settings />
        <Dropdown
          title={config.template}
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

        <AceEditor
          mode={Object.keys(config.languages)[config.tabIndex]}
          theme="monokai"
          onChange={onEditorValueChange}
          value={editorVal[config.tabIndex]}
          name="UNIQUE_ID_OF_DIV"
          fontSize={16}
          editorProps={{ $blockScrolling: true }}
        />

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
}

export default React.memo(Editor);