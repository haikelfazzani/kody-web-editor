import React from 'react';
import Split from 'react-split';
import Editor from '../containers/Editor';
import Sidebar from '../containers/Sidebar';
import CodeResult from '../containers/CodeResult';
import '../styles/code-editor.css';

export default function CodeEditor () {
  return <main>
    <Sidebar />

    <div className="container">
      <Split sizes={[50, 50]} gutterSize={7} gutterAlign="center" direction="horizontal">
        <Editor />
        <CodeResult />
      </Split>
    </div>
  </main>;
}