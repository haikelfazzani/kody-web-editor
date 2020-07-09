import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";

import { useStoreState } from 'easy-peasy';

export default function EditorAce ({
  value, onEditorChange, lang = 'html', readOnly = false
}) {

  const { fontSize } = useStoreState(state => state.editorModel);

  return <AceEditor
    mode={lang === 0 ? 'html' : lang === 1 ? 'css' : 'typescript'}
    theme="monokai"
    onChange={onEditorChange}
    name="ace-editor-container"
    editorProps={{ $blockScrolling: true }}
    fontSize={fontSize + 'px'}
    value={value}
    height="100%"
    width="100%"
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: true,
      readOnly,
      tabSize: 2,
      useWorker: false
    }}
  />
}