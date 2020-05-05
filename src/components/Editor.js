import React, { useState, useEffect } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { useStoreState } from 'easy-peasy';

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

  const fontSize = useStoreState(state => state.editorSettings.model.fontSize);

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
    document.querySelector('.CodeMirror').style.fontSize = fontSize;
  }, [fontSize]);

  useEffect(() => {
    setOptions({ ...options, mode: lang });
  }, [lang]);

  const onKeyPress = (editor, event) => {
    if (!readOnly && event.keyCode > 64 && event.keyCode < 123) {
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