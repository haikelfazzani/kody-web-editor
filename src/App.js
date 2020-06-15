
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Playground from "./pages/Playground";

export default function App () {

  return <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/playground" component={Playground} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>;
} 