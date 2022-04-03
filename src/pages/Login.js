import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import '../styles/login.css';

export default function Login() {
  const onLogin = () => {
    AuthService.login();
  }

  return <main className='w-100 h-100 login d-flex flex-column justify-center align-center br7'>
    <div>
      <img className='rounded shadow mb-1' src='/logo192.png' alt='sign in dropbox' />
      <button className='w-100 btn mb-1' onClick={onLogin} title="Sign In With Dropbox">
        <i className="fab fa-dropbox mr-1"></i>Sign in
      </button>
      <Link to="/" className='btn'><i className='fa fa-terminal mr-1'></i>playground</Link>
    </div>
  </main>
}