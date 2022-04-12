import React, { createContext, useReducer } from 'react';
import PlaygroundReducer from './PlaygroundReducer';
import initState from './PlaygroundState';

const PlaygroundContext = createContext();

function PlaygroundProvider(props) {
  const [playgroundState, dispatch] = useReducer(PlaygroundReducer, initState);

  return <PlaygroundContext.Provider value={{ playgroundState, dispatch }} >
    {props.children}
  </PlaygroundContext.Provider>
}

export { PlaygroundContext, PlaygroundProvider };
