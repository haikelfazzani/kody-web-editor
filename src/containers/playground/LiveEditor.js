import React, { useState, useEffect, useContext } from 'react';
import { PlaygroundContext } from '../../store/PlaygroundProvider';
import { IframeUtil } from '../../util/IframeUtil'
import { useRecoilValue } from 'recoil';
import AceEditor from "react-ace";
import templates from '../../util/templates';
import jsBeauty from '../../util/jsBeauty';

import SuperbaseService from '../../services/SuperbaseService'

import TemplatesService from '../../services/TemplatesService';

import templateState from '../../atoms/templateState';
import editorOptionsState from '../../atoms/editorOptionsState';
import tabState from '../../atoms/tabState';
import useAuth from '../../hooks/useAuth';
import unquer from 'unquer';

function LiveEditor() {
  const authSession = useAuth();
  const params = unquer.parse(window.location.href)

  const { playgroundState, dispatch } = useContext(PlaygroundContext);
  const [tabs, setTabs] = useState(templates['local']);

  const template = useRecoilValue(templateState);
  const editorOptions = useRecoilValue(editorOptionsState);
  const { tabIndex, languages } = useRecoilValue(tabState)

  useEffect(() => {
    (async () => {
      try {
        await TemplatesService();

        if (params.p) {
          const { content } = await SuperbaseService.getOnePaste(params.p);
          const temp = JSON.parse(content);
          setTabs(JSON.parse(content));
          localStorage.setItem('tabs', JSON.stringify(temp))
        }
      } catch (error) {
        console.log(error);
       }
    })();
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
      dispatch({ type: 'console-logs', payload: { logs: ifu.formatOutput(messages) } })
    };

    ifu.write(...tabs, err => {
      if (err) {
        dispatch({ type: 'console-logs', payload: { logs: err } })
      }
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

  const onShowConsole = () => { dispatch({ type: 'show-console' }) }

  return <div className="editor">
    
    <AceEditor
      mode={Object.keys(languages)[tabIndex]}
      onChange={onEditorValueChange}
      value={tabs[tabIndex]}
      name="kody-ace-editor"
      editorProps={{ $blockScrolling: true }}
      {...editorOptions}
    />

    <div className="btn-group">
      <button className="btn" title="Run Code" onClick={onRun}><i className="fa fa-play"></i></button>
      <button className="btn" title="Format Code" onClick={onPrettier}><i className="fa fa-stream"></i></button>
      <button className="btn" title='Load File' onClick={openFile}><i className="fa fa-folder-open"></i></button>
      <button className="btn" title="Show Console" onClick={onShowConsole}><i className="fa fa-terminal"></i></button>
    </div>
    <input type="file" name="desktop-file" id="desktop-file" onChange={onLoadFile} accept="text/html" hidden />
  </div>
}

export default React.memo(LiveEditor);