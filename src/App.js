import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";

const Playground = lazy(() => import("./pages/Playground"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
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

        {/* <Redirect path="*" to="/" /> */}
      </Switch>
    </Suspense>
  </BrowserRouter>;
} 