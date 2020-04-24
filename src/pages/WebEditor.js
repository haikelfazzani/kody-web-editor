import React, { useContext, useState, useEffect, useMemo } from 'react';
import WebEditorNav from '../containers/WebEditorNav';
import SplitPane from '../components/SplitPane';
import Sidebar from '../components/Sidebar';
import '../styles/code-editor.css';
import Editor from '../components/Editor';
import KodyContext from '../providers/KodyContext';
import cosLogs from '../util/console';
import htmlToBlob from '../util/htmlToBlob';
import Iframe from '../components/Iframe';

export default function WebEditor () {

  const { state, setState } = useContext(KodyContext);
  const [value, setValue] = useState();

  useEffect(() => {
    switch (state.mode) {
      case 'css':
        setValue(state.css);
        break;

      case 'javascript':
        setValue(state.javascript);
        break;

      default:
        setValue(state.html);
        break;
    }

  }, [state.mode]);

  const onChange = (code) => {
    setValue(code);
    switch (state.mode) {
      case 'javascript':
        setState({ ...state, javascript: code });
        break;

      case 'css':
        setState({ ...state, css: code });
        break;

      default:
        break;
    }
  }

  const memoizedValue = useMemo(() => {
    localStorage.setItem('kody-code', JSON.stringify(state));
    return { html: state.html, css: state.css, javascript: state.javascript };
  }, [state]);

  return <main>

    <Sidebar> <WebEditorNav /></Sidebar>

    <div className="container">

      <SplitPane name="kody-split-pane">
        <Editor onChange={onChange} value={value} mode={state.mode} />

        <div className="result">
          <SplitPane name="kody-split-result-iframes" direction="vertical">
            <Iframe
              title="kody iframe"
              id="iframe-result"
              src={htmlToBlob(memoizedValue.html, memoizedValue.css, memoizedValue.javascript)}
            />

            <Iframe title="iframe-console" src={cosLogs(memoizedValue.html, memoizedValue.javascript)} />
          </SplitPane>
        </div>

      </SplitPane>
    </div>
  </main>;
}