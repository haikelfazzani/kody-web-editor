import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from 'easy-peasy';
import store from './providers/GlobalProvider';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
