import React, { useState, createContext } from 'react';

let codeJsx = `
// <div id="root"></div>
function Main() {  
  return <div>hello</div>  
}  

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);`

let localStor = localStorage.getItem('kody-code');
let kodyLocal = localStor ? JSON.parse(localStor) : {};

/** init values ace editor settings */
let { editorSettings } = kodyLocal ? kodyLocal : {};

let initEditorSettings = {
  theme: editorSettings ? editorSettings.theme : 'monokai',
  fontSize: editorSettings ? editorSettings.fontSize : 16,
  live: editorSettings ? editorSettings.live : false,
  showPrintMargin: editorSettings ? editorSettings.showPrintMargin : false,
  wrapEnabled: editorSettings ? editorSettings.wrapEnabled : true,
  enableLiveAutocompletion: editorSettings ? editorSettings.enableLiveAutocompletion : true
}

/** init values global state */
let initState = {
  html: kodyLocal.html || '<p id="para">hello world</p>',
  css: kodyLocal.css || 'body {color: #000 }',
  javascript: kodyLocal.javascript || 'document.getElementById("para").innerHTML = "welcome";',
  jsx: kodyLocal.jsx || codeJsx,
  mode: kodyLocal.mode || 'html',
  runcode: kodyLocal.runcode || false,
  showSettingsModal: kodyLocal.showSettingsModal || false,
  editorSettings: initEditorSettings
} || kodyLocal;

export const KodyContext = createContext();

export function KodyProvider ({ children }) {

  const [state, setState] = useState(initState);

  return <KodyContext.Provider value={{ state, setState }}>
    {children}
  </KodyContext.Provider>;
}