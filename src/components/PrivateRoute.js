import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DropboxAuth } from "../services/DropboxService";

const PrivateRoute = (props) => {

  return DropboxAuth.getToken()
    ? <Route {...props} />
    : <Redirect to="/" />;
};

export default PrivateRoute;