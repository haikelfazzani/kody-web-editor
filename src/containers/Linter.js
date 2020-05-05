import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';

const Linter = ({ jsValue }) => {

  const [jsHintErrors, setJsHintErrors] = useState(null);
  const [transpiledCode, setTranspiledCode] = useState();
  const [isTranspiled, setIsTranspiled] = useState(false);

  useEffect(() => {
    if (jsValue) {
      // JShint errors
      window.JSHINT(jsValue, { asi: true, lastsemic: false, esnext: true });

      setJsHintErrors(window.JSHINT.errors.reduce((a, e) => {
        a += `line ${e.line}: ${e.reason} \n`;
        return a
      }, ''));      
    }
  }, [jsValue]);

  const onTranspile = () => {
    // babel transpiler
    let output = '';
    try {
      output = window.Babel.transform(jsValue, { envName: 'production', presets: ['es2015'] }).code;
      setTranspiledCode(output);
    } catch (error) {
      setTranspiledCode(error.message);
    }
    setIsTranspiled(!isTranspiled);
  }

  return <header className="overflow-auto">
    <div className="tabs overflow-auto">
      <span className="tab active-tab">
        {isTranspiled
          ? <><i className="fas fa-globe mr-2"></i> Babel</>
          : <><i className="fas fa-bug mr-2"></i> Linter</>}
      </span>

      <button onClick={onTranspile} className="btn btn-outline-light">
        {isTranspiled ? <i className="fas fa-bug"></i> : <i className="fas fa-globe"></i>}
      </button>
    </div>

    <Editor value={isTranspiled ? transpiledCode : jsHintErrors} readOnly={true} />
  </header>
}

export default React.memo(Linter);