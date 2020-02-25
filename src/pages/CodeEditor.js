import React, { useState } from 'react';
import Split from 'react-split';
import Editor from '../containers/Editor';
import Sidebar from '../containers/Sidebar';
import CodeResult from '../containers/CodeResult';
import '../styles/code-editor.css';

export default function CodeEditor () {

  const [sizes, setSizes] = useState(() => {
    let localSizes = localStorage.getItem('kody-split-pane');
    return localSizes ? JSON.parse(localSizes) : [50, 50];
  });

  const onDragEnd = v => {
    localStorage.setItem('kody-split-pane', JSON.stringify(v));
  }

  return <main>
    <Sidebar />

    <div className="container">
      <Split sizes={sizes} onDragEnd={onDragEnd} minSize={0} gutterSize={7} gutterAlign="center" direction="horizontal">
        <Editor />
        <CodeResult />
      </Split>
    </div>
  </main>;
}