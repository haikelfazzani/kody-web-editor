import React, { useContext, useEffect } from 'react';
import { KodyContext } from '../hooks/KodyProvider';
import htmlToBlob from '../util/htmlToBlob';

export default function CodeResult () {

  const { state, setState } = useContext(KodyContext);

  useEffect(() => {
    localStorage.setItem('kody-code', JSON.stringify(state));
  }, [state, setState]);

  return <div className="result">
    <iframe id="iframe-result" src={htmlToBlob(state.html, state.css, state.javascript)}></iframe>
  </div>;
}