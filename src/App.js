import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';

import Auth from "./pages/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";

const Playground = lazy(() => import("./pages/Playground"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const About = lazy(() => import("./pages/About"));
// const Contact = lazy(() => import("./pages/Contact"));

export default function App () {
  return <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={Playground} />
        <Route path="/:id" component={Playground} />

        <Route path="/auth" component={Auth} />

        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        {/* <Route path="/contact" component={Contact} /> */}

        <Redirect path="*" to="/" />
      </Switch>
    </Suspense>
  </BrowserRouter>;
} 