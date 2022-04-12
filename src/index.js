import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './styles/index.css';
import './styles/Playground.css';
import './styles/themes.css';
import './styles/dropdown.css';
import './styles/util.css';


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot><App /></RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
