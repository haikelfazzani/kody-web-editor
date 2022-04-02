import React, { createContext, useState } from 'react';
import cdns from '../util/Preprocessor';
import Preprocessor from '../util/Preprocessor';
import templates from '../util/templates';

const PlaygroundContext = createContext();

const initState = localStorage.getItem('kody-state')
  ? JSON.parse(localStorage.getItem('kody-state'))
  : {
    tabs: templates['vanilla'],
    languages: { html: 'html', css: 'css', javascript: 'javascript' },
    template: 'vanilla',
    tabIndex: 0,

    aceOptions: {
      enableBasicAutocompletion: true,
      enableSnippets: false,
      enableLiveAutocompletion: true,
      highlightActiveLine: true,
      wrapBehavioursEnabled: true,
      showPrintMargin: true,
      showGutter: true,
      highlightGutterLine: true,
      fontSize: 16,
      theme: 'ace/theme/monokai',
      useWorker: false,
      tabSize: 4,
      mode: 'ace/mode/html'
    }
  };


let counter = 0;
for (const [key, value] of Object.entries(initState.languages)) {

  if (cdns[value]) Preprocessor.appendScript(value);
  if (value !== 'babel' && /react/gi.test(initState.template)) {
    Preprocessor.appendScript('babel');
  }

  if (initState.tabIndex === counter) initState.aceOptions.mode = 'ace/mode/' + key

  counter++;
}

if (/react/gi.test(initState.template)) initState.languages['javascript'] = 'babel';


function PlaygroundStore(props) {
  const [playgroundState, setPlaygroundState] = useState(initState)

  return <PlaygroundContext.Provider value={{ playgroundState, setPlaygroundState }} >
    {props.children}
  </PlaygroundContext.Provider>
}

export { PlaygroundContext, PlaygroundStore };
