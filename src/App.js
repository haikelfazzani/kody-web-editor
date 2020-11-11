
import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

export default function App () {

  return <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Home} />
      
      <Route exact path="/playground" component={Playground} />
      <Route path="/playground/:service/:id" component={Playground} />

      <Route path="/auth" component={Auth} />

      <PrivateRoute path="/profile" component={Profile} />
      
      {/* <Redirect path="*" to="/" /> */}
    </Switch>
  </BrowserRouter>;
} 