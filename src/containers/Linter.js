import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';

const Linter = ({ jsValue }) => {

  const [jsHintErrors, setJsHintErrors] = useState(null);

  useEffect(() => {
    if (jsValue) {
      window.JSHINT(jsValue, { asi: true, lastsemic: false, esnext: true });

      setJsHintErrors(window.JSHINT.errors.reduce((a, e) => {
        a += `line ${e.line}: ${e.reason} \n`;
        return a
      }, ''));
    }
  }, [jsValue]);

  return <header className="overflow-auto">
    <div className="tabs overflow-auto">
      <span className="tab active-tab"><i className="fas fa-bug mr-2"></i> Linter</span>
    </div>

    <Editor value={jsHintErrors} />
  </header>
}

export default React.memo(Linter);