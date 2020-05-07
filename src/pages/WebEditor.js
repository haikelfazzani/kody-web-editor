import React from 'react';
import Playground from '../containers/Playground';
import Navbar from '../containers/navbar/Navbar';

import '../styles/WebEditor.css';

export default function WebEditor () {

  return <div className="w-100 h-100 pl-lg-3 pr-lg-3">
    <Navbar />

    <main>
      <Playground />
    </main>
  </div>;
}