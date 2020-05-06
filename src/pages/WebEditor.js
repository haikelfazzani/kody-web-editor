import React from 'react';
import Playground from '../containers/Playground';
import Navbar from '../containers/navbar/Navbar';

import '../styles/WebEditor.css';

export default function WebEditor () {

  return <>
    <Navbar />

    <main>
      <Playground />
    </main>
  </>;
}