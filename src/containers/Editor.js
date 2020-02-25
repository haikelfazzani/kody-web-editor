import React, { useState, useEffect, useContext } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-jsx";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";

import "ace-builds/src-noconflict/ext-language_tools";

import { KodyContext } from "../hooks/KodyProvider";

export default function Editor () {

  const { state, setState } = useContext(KodyContext);
  const [value, setValue] = useState();
  let { theme, fontSize, showPrintMargin, wrapEnabled, enableLiveAutocompletion } = state.editorSettings;

  useEffect(() => {
    switch (state.mode) {
      case 'css':
        setValue(state.css);
        break;

      case 'javascript':
        setValue(state.javascript);
        break;

      case 'jsx':
        setValue(state.jsx);
        break;

      default:
        setValue(state.html);
        break;
    }

  }, [state, setState]);

  const onChange = (code) => {
    setValue(code);

    switch (state.mode) {
      case 'css':
        setState({ ...state, css: code });
        break;

      case 'javascript':
        setState({ ...state, javascript: code });
        break;

      case 'jsx':
        setState({ ...state, jsx: code });
        break;

      default:
        setState({ ...state, html: code });
        break;
    }
  }

  return <AceEditor
    placeholder="Placeholder Text"
    mode={state.mode}
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