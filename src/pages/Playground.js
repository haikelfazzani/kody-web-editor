import React from 'react';
import Sidebar from '../components/Sidebar';
import Editor from '../containers/Editor';
import {withRouter} from 'react-router-dom';

function Playground () {
  return (<main className="h-100 w-100">
    <Sidebar />
    <Editor />
  </main>);
}

export default withRouter(Playground);