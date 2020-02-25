import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './styles/App.css';
import './styles/scroll.css';

import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';

export default function App () {

  return <Router>
    <Route exact path="/" component={Home} />
    <Route path="/editor" component={CodeEditor} />
  </Router>;
}
