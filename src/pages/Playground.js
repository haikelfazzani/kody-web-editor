import React from 'react';
import Editor from '../containers/Editor';
import { StoreProvider } from 'easy-peasy';
import playgroundStore from '../state/playgroundStore';
import { withRouter } from 'react-router-dom';

function Playground () {

  return (
    <StoreProvider store={playgroundStore}>
      <main className="h-100 w-100">
        <Editor />
      </main>
    </StoreProvider>
  );
}

export default withRouter(Playground);