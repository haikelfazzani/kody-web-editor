import React from 'react';
import { Link } from 'react-router-dom';
import SuperbaseService from '../services/SuperbaseService'

import '../styles/login.css';

export default function Login() {
  const onLogin = async () => {
    const {  user, session, error  } = await SuperbaseService.signin();    
  }

  return <main className='w-100 h-100 login d-flex flex-column justify-center align-center br7'>
    <div>
      <img className='rounded shadow mb-1' src='/logo192.png' alt='sign in github' />
      <button className='w-100 btn mb-1' onClick={onLogin} title="Sign In With github">
        <i className="fab fa-github mr-1"></i>Sign in
      </button>
      <Link to="/" className='btn'><i className='fa fa-terminal mr-1'></i>playground</Link>
    </div>
  </main>
}