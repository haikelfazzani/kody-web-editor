import React, { useContext } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-jsx";

import "ace-builds/src-min-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-cobalt";

import "ace-builds/src-noconflict/theme-ayu_dark";
import "ace-builds/src-noconflict/theme-vs_dark";
import "ace-builds/src-noconflict/theme-material";

import "ace-builds/src-noconflict/ext-language_tools";

import KodyContext from "../providers/KodyContext";

export default function Editor ({ onChange, value, mode }) {

  const { state } = useContext(KodyContext);
  let { theme, fontSize, showPrintMargin, wrapEnabled, enableLiveAutocompletion } = state.editorSettings;

  return <AceEditor    
    mode={mode}
    theme={theme}
    name="kody-ace-editor"
    onChange={onChange}
    fontSize={fontSize}
    showPrintMargin={showPrintMargin}
    showGutter={true}
    highlightActiveLine={true}
    value={value}
    wrapEnabled={wrapEnabled}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: enableLiveAutocompletion,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
      useWorker: false
    }} />
}