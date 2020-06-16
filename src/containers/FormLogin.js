import React, { useState } from 'react';
import PastebinService from '../services/PastebinService';
import { withRouter } from 'react-router-dom';

function FormLogin (props) {

  const [error, setError] = useState(null);

  const onLogin = (e) => {
    e.preventDefault();
    const [username, password] = Array.from(e.target.elements);

    PastebinService.login(username.value, password.value)
      .then(r => {
        props.history.push('/playground');
      })
      .catch(e => {
        setError(e.message);
      });
  }

  return (<div>
    <form onSubmit={onLogin}>
      <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" placeholder="Pastebin username" required />
      </div>


      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Pastebin password" required />        
      </div>      

      <button type="submit" className="btn btn-primary btn-block">Submit</button>
    </form>

    {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
  </div>);
}

export default withRouter(FormLogin)