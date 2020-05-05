import React from 'react';
import ReactDOM from 'react-dom';
import GlobalProvider from './providers/GlobalProvider';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <GlobalProvider>
      <App />
    </GlobalProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
