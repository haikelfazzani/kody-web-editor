import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

function AuthRoute (props) {
  useEffect(() => {
    try {
      AuthService.setToken();
      props.history.push('/');
    } catch (error) {
      props.history.push('/');
    }
  }, []);

  return (<div>Loading..</div>);
}

export default withRouter(AuthRoute);