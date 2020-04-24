import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './styles/App.css';
import './styles/scroll.css';

import Home from './pages/Home';
import WebEditor from './pages/WebEditor';
import ReactPlay from './pages/ReactPlay';

export default function App () {

  return <Router>
    <Route exact path="/" component={Home} />
    <Route path="/editor" component={WebEditor} />
    <Route path="/react" component={ReactPlay} />
  </Router>;
}
