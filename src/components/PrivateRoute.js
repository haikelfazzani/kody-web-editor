import React from 'react';
import { Route, Redirect } from "react-router-dom";
import PastebinService from '../services/PastebinService';

const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={props => (
      PastebinService.getUsername()
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
}

export default PrivateRoute;