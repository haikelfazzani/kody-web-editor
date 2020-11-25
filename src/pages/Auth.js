import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { DropboxAuth } from '../services/DropboxService';

function Auth (props) {
  useEffect(() => {
    try {
      DropboxAuth.setToken();
      props.history.push('/');
    } catch (error) {
      props.history.push('/');
    }
  }, []);

  return (<div>Loading..</div>);
}

export default withRouter(Auth);