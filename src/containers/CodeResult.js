import React, { useContext, useState, useEffect } from 'react';
import KodyContext from '../providers/KodyContext';
import htmlToBlob from '../util/htmlToBlob';
import reactToBlob from '../util/reactToBlob';
import cosLogs from '../util/console';

import Split from 'react-split';

const Iframe = React.memo(({ codeWeb, codeJsx, mode }) => {
  return <iframe title="kody iframe"
    id={mode === 'jsx' ? "iframe-react" : "iframe-result"}
    src={mode === 'jsx'
      ? reactToBlob(codeJsx)
      : htmlToBlob(codeWeb.html, codeWeb.css, codeWeb.javascript)}>
  </iframe>
});

const IframeConsole = React.memo(({ codeWeb }) => {
  return <iframe title="iframe-console" src={cosLogs(codeWeb.html, codeWeb.javascript)}></iframe>
});

export default function CodeResult () {

  const { state, setState } = useContext(KodyContext);
  const [codeWeb, setCodeWeb] = useState({ html: '', css: '', javascript: '' });
  const [codeJsx, setCodeJsx] = useState('');

  const [sizes] = useState(() => {
    let localSizes = localStorage.getItem('kody-split-result-iframes');
    return localSizes ? JSON.parse(localSizes) : [50, 50];
  });

  useEffect(() => {
    localStorage.setItem('kody-code', JSON.stringify(state));
    if (state.runcode && state.mode !== 'jsx') {
      setCodeWeb({ html: state.html, css: state.css, javascript: state.javascript });
    }
    else {
      setCodeJsx(state.jsx);
    }
  }, [state, setState]);

  const onDragEnd = v => {
    localStorage.setItem('kody-split-result-iframes', JSON.stringify(v));
  }

  return <div className="result">
    <Split
      sizes={sizes} onDragEnd={onDragEnd}
      minSize={0}
      cursor="row-resize"
      gutterSize={7}
      gutterAlign="center"
      direction="vertical">
      <Iframe codeWeb={codeWeb} codeJsx={codeJsx} mode={state.mode} />
      <IframeConsole codeWeb={codeWeb} />
    </Split>
  </div>;
}