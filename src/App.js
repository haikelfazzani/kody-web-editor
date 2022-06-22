import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Spinner from "./components/Spinner";
import routes from "./routes";
// import PrivateRoute from "./auth/PrivateRoute";

export default function App () {
  return <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Switch>

        {routes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}

        <Redirect path="*" to="/" />
      </Switch>
    </Suspense>
  </BrowserRouter>;
} 