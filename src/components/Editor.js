import React, { useState, useEffect } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';

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

import 'codemirror/addon/comment/comment';


export default function Editor ({ onChange, value, lang = 'javascript', readOnly = false }) {

  const [mode, setMode] = useState(lang);

  useEffect(() => {
    setMode(lang);
  }, [lang]);

  const onKeyDown = (editor, event) => {

    if (!readOnly && event.ctrlKey && (event.keyCode === 58 || event.keyCode === 191)) {
      editor.execCommand('toggleComment')
    }

    if (!readOnly && !event.ctrlKey && event.keyCode > 64 && event.keyCode < 123) {
      setTimeout(() => { editor.showHint(); }, 250);
    }
  }

  return (
    <CodeMirror
      autoCursor={false}
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      options={{
        mode: mode,
        theme: 'monokai',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        matchTags: true,
        foldGutter: true,
        readOnly,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      }}
    />
  );

}