import React from 'react';
import { withRouter } from 'react-router-dom';
import Editor from '../containers/Editor';
import { PlaygroundStore } from '../store/playgroundStore';

function Playground() {
  return (<PlaygroundStore>
    <Editor />
  </PlaygroundStore>);
}

export default withRouter(Playground);