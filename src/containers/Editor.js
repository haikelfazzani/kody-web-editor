import React, { useState, useEffect, useContext } from 'react';
import { PlaygroundContext } from '../store/PlaygroundProvider';

import { IframeUtil } from '../util/IframeUtil'
import Split from 'react-split';
import AceEditor from "react-ace";
import Menu from './Menu';
import templates from '../util/templates/index';
import jsBeauty from '../util/jsBeauty';
import download from '../util/download';

import { DropboxService } from '../services/DropboxService';
import tabsToHTML from '../util/tabsToHTML';

import '../styles/Playground.css';

function Editor() {
  const isMobile = window.innerWidth < 700,
    params = new URLSearchParams(window.location.search),
    service = params.get('service'),
    file = params.get('file');

  const { playgroundState } = useContext(PlaygroundContext);
  const { tabIndex, template, languages, theme, fontSize } = playgroundState;

  const [tabs, setTabs] = useState(templates['local']);

  const [consoleLogs, setConsoleLogs] = useState('');
  const [showConsole, setShowConsole] = useState(true);

  useEffect(() => {
    if (service && file) {
      DropboxService.downloadFile(file)
        .then(content => {
          const temp = tabs.slice(0);
          temp[0] = content;
          temp[1] = '';
          temp[2] = '';
          setTabs(temp);
          localStorage.setItem('tabs', JSON.stringify(temp))
        })
        .catch(e => { })
    }
    return () => { }
  }, [])

  useEffect(() => {
    setTabs(templates[template]);
    return () => { }
  }, [template])

  const onEditorValueChange = value => {
    const temp = tabs.slice(0);
    temp[tabIndex] = value;
    setTabs(temp);
    localStorage.setItem('tabs', JSON.stringify(temp))
  }

  const onRun = () => {
    let ifu = new IframeUtil(languages);

    let messages = [];
    ifu.iframeWin.console.log = (...args) => {
      messages.push.apply(messages, [args]);
      setConsoleLogs(ifu.formatOutput(messages));
    };

    ifu.write(...tabs, err => {
      if (err) { setConsoleLogs(err); }
    });
  }

  const onPrettier = () => {
    let val = jsBeauty(tabs[tabIndex], Object.keys(languages)[tabIndex]);
    const temp = tabs.slice(0);
    temp[tabIndex] = val;
    setTabs(temp)
  }

  const openFile = () => {
    document.getElementById('desktop-file').click();
  }

  const onLoadFile = (e) => {
    let file = e.target.files.item(0);
    if (file && file.type === 'text/html') {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const temp = tabs.slice(0);
        temp[0] = reader.result;
        setTabs(temp);
        localStorage.setItem('tabs', JSON.stringify(temp))
      };
    }
  }

  const onDownload = () => {
    const html = tabsToHTML(tabs)
    download(html, 'kody.html')
  }

  const onShowConsole = () => { setShowConsole(!showConsole); }
  const onClearConsole = () => { setConsoleLogs(''); }

  return <div className="playground">
    <Menu>
      <li title='Load File' onClick={openFile}>
        <i className="fa fa-folder-open"></i>
      </li>

      <li title="Download Code" onClick={onDownload}>
        <i className="fa fa-download"></i>
      </li>
    </Menu>

    <Split minSize={0} direction={isMobile ? "vertical" : "horizontal"} cursor="col-resize" gutterSize={7}
      className={"h-100 d-flex" + (isMobile ? " flex-column" : "")}>
      <div className="editor">
        <AceEditor
          mode={Object.keys(languages)[tabIndex]}
          theme={theme}
          onChange={onEditorValueChange}
          value={tabs[tabIndex]}
          name="kody-ace-editor"
          fontSize={fontSize}
          editorProps={{ $blockScrolling: true }}
        />

        <div className="btn-group">
          <button className="btn" title="Run Code" onClick={onRun}><i className="fa fa-play"></i></button>
          <button className="btn" title="Format Code" onClick={onPrettier}><i className="fa fa-stream"></i></button>
          <button className="btn" title="Show Console" onClick={onShowConsole}><i className="fa fa-terminal"></i></button>
        </div>
      </div>

      <Split direction={isMobile ? "horizontal" : "vertical"}
        gutterSize={7}
        sizes={showConsole ? [50, 50] : [100, 0]}
        minSize={showConsole ? 70 : 0}
        className={"w-100 d-flex" + (isMobile ? "" : " flex-column")}>

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

    <input type="file" name="desktop-file" id="desktop-file" onChange={onLoadFile} accept="text/html" hidden />
  </div>
}

export default React.memo(Editor);