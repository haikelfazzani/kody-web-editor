import React, { useState, useEffect, useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import GlobalContext from '../providers/GlobalContext';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css'

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';

const hintOptions = { disableKeywords: false, completeSingle: false, completeOnSingleClick: false };

export default function Editor ({ onChange, value, lang = 'jsx',readOnly = false }) {

  const { state } = useContext(GlobalContext);
  const [options, setOptions] = useState({
    mode: lang,
    theme:'monokai',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchTags: true,
    foldGutter: true,
    readOnly,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  useEffect(() => {
    // let allEditors = document.querySelectorAll('.CodeMirror');
    // [...allEditors].forEach(e => {
    //   e.style.fontSize = state.fontSize;
    // });

    document.querySelector('.CodeMirror').style.fontSize = state.fontSize;
  }, [state.fontSize]);

  useEffect(() => {
    setOptions({ ...options, mode: lang });
  }, [lang]);

  const onKeyPress = (editor, event) => {
    if (event.keyCode > 64 && event.keyCode < 123) {
      setTimeout(() => { editor.showHint(hintOptions); }, 250);
    }
  }

  return (
    <CodeMirror
      autoCursor={false}
      onChange={onChange}
      value={value}
      options={options}      
      onKeyPress={onKeyPress}
    />
  );

}