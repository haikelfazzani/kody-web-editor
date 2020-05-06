import React from 'react';
import Split from 'react-split';
import Playground from '../containers/Playground';
import Navbar from '../containers/navbar/Navbar';

import '../styles/WebEditor.css';

export default function WebEditor () {

  return <>
    <Navbar />

    <main>
      <Split gutterSize={10} sizes={[50, 50]}>
        <Playground />
      </Split>
    </main>
  </>;
}