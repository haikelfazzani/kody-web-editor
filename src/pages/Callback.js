import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Callback(props) {
  useEffect(() => {
    let token = window.location.href.match(/(?<=access_token=)(.*?)(?=&)/gi)[0];
    localStorage.setItem('auth-token', token);
    props.history.push(token ? '/account' : '/login')
  }, []);

  return <Spinner />
}

export default withRouter(Callback)
