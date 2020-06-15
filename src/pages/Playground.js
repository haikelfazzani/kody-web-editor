import React from 'react';
import Sidebar from '../components/Sidebar';
import Editor from '../containers/Editor';

export default function Playground () {
  return (<main className="h-100 w-100">
    <Sidebar />
    <Editor />
  </main>);
}