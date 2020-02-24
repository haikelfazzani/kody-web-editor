import React from 'react';
import Split from 'react-split';
import Editor from '../containers/Editor';
import Sidebar from '../containers/Sidebar';
import Nav from '../components/Nav';
import CodeResult from '../containers/CodeResult';

export default function Home () {
  return <>
    <Nav />

    <main>
      <Sidebar />

      <div className="container">
        <Split sizes={[50, 50]} gutterSize={7} gutterAlign="center" direction="horizontal">
          <Editor />
          <CodeResult />
        </Split>
      </div>
    </main>
  </>;
}