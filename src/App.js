import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';

import Auth from "./pages/Auth";
import Spinner from "./components/Spinner";
// import PrivateRoute from "./auth/PrivateRoute";

const Playground = lazy(() => import("./pages/Playground"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));

export default function App () {
  return <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={Playground} />

        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Login} />

        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />

        <Redirect path="*" to="/" />
      </Switch>
    </Suspense>
  </BrowserRouter>;
} 