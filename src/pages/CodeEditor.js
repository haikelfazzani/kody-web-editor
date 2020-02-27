import React from 'react';
import Editor from '../containers/Editor';
import Sidebar from '../containers/Sidebar';
import CodeResult from '../containers/CodeResult';
import '../styles/code-editor.css';
import SplitPane from '../components/SplitPane';

export default function CodeEditor () {

  return <main>
    <Sidebar />

    <div className="container">
      <SplitPane name="kody-split-pane">
        <Editor />
        <CodeResult />
      </SplitPane>
    </div>
  </main>;
}