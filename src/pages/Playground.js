import React from 'react';
import { withRouter } from 'react-router-dom';
import Editor from '../containers/Editor';
import { PlaygroundProvider } from '../store/PlaygroundProvider';

function Playground() {
  return (<PlaygroundProvider>
    <Editor />
  </PlaygroundProvider>);
}

export default withRouter(Playground);