import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Home from "./pages/home/Home";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";

const Playground = lazy(() => import("./pages/Playground"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const About = lazy(() => import("./pages/About"));

export default function App () {

  return <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/playground" component={Playground} />
        <Route path="/playground/:service/:id" component={Playground} />

        <Route path="/auth" component={Auth} />

        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/About" component={About} />

        <Redirect path="*" to="/" />
      </Switch>
    </Suspense>
  </BrowserRouter>;
} 