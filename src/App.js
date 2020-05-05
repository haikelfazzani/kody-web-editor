import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from "./pages/Home";
import WebEditor from "./pages/WebEditor";

import './styles/App.css';

export default function App () {

  return <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Home} />

      <Route path="/web-editor" component={WebEditor} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
} 