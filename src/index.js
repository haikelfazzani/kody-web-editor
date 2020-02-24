import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { KodyProvider } from './hooks/KodyProvider';

ReactDOM.render(
  <KodyProvider>
    <App />
  </KodyProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
