import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-jsx";

import "ace-builds/src-noconflict/theme-monokai";

import * as langTools from "ace-builds/src-noconflict/ext-language_tools";

import { useStoreState } from 'easy-peasy';

var staticWordCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    var wordList = [
      { word: "document", value: "document", meta: "document" },
      { word: "getElementById", value: "getElementById()", meta: "get element by id" },
      { word: "querySelector", value: "querySelector()", meta: "get element by selector" },
      { word: "querySelectorAll", value: "querySelectorAll()", meta: "get elements by selector" },
      { word: "console.log", value: "console.log()", meta: "log" },
      { word: "function", value: "function name() {}", meta: "Create function" },
      { word: "return", value: "return", meta: "return" },
      { word: "Date", value: "new Date()", meta: "Date" },
      { word: "innerHTML", value: "innerHTML", meta: "innerHTML" },
      { word: "Object.entries", value: "Object.entries({}) ", meta: "Object method" }
    ];
    callback(null, wordList);
  }
}

export default function EditorAce ({ value, onEditorChange, lang = 'html', readOnly = false }) {

  const { fontSize } = useStoreState(state => state.editorModel);

  if (lang === 2) {
    langTools.setCompleters([staticWordCompleter]);
  }

  return <AceEditor
    mode={lang === 0 ? 'html' : lang === 1 ? 'css' : 'javascript'}
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