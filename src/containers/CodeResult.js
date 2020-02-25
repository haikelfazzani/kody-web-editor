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
      state.runcode
        ? <iframe title="kody iframe"
          id={state.mode === 'jsx' ? "iframe-react" : "iframe-result"}
          src={state.mode === 'jsx'
            ? reactToBlob(state.jsx)
            : htmlToBlob(state.html, state.css, state.javascript)}>
        </iframe>
        : <iframe title="kody empty" id="empty"></iframe>
    }
  </div>;
}