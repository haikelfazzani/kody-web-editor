import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { KodyProvider } from './providers/KodyProvider';

ReactDOM.render(
  <KodyProvider>
    <App />
  </KodyProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
