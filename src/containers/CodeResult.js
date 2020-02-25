import React, { useContext, useEffect } from 'react';
import { KodyContext } from '../hooks/KodyProvider';
import htmlToBlob from '../util/htmlToBlob';
import reactToBlob from '../util/reactToBlob';

export default function CodeResult () {

  const { state, setState } = useContext(KodyContext);

  useEffect(() => {
    localStorage.setItem('kody-code', JSON.stringify(state));
  }, [state, setState]);

  return <div className="result">
    {
      state.mode === 'jsx'
        ? <iframe id="iframe-react" src={reactToBlob(state.jsx)}></iframe>
        : <iframe id="iframe-result" src={htmlToBlob(state.html, state.css, state.javascript)}></iframe>
    }
  </div>;
}