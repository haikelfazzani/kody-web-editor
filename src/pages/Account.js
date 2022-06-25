import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner'
import SuperbaseService from '../services/SuperbaseService';

export default function Account() {
  const authSession = useAuth();
  const [pastes, setPastes] = useState(null)

  useEffect(() => {
    if (!authSession || !authSession.user_metadata) return;

    (async () => {
      const data = await SuperbaseService.getAllPastes(authSession.user_metadata.email);
      setPastes(data);
    })();
  }, [authSession]);

  const signout = async () => {
    await SuperbaseService.signout()
  }

  if (authSession && authSession.user_metadata) {
    const user = authSession.user_metadata;
    return (
      <div className='grid-1-3 border br7' style={{ height: 'calc(100vh - 15px)' }}>
        <div className='w-100 border-right text-center p-2 bg-dark'>
          <img className='w-100 rounded' src={user.avatar_url} alt={user.user_name} />
          <h3>{user.name}</h3>
          <p>last sign in at: {new Date(authSession.last_sign_in_at).toDateString()}</p>
          <Link className='w-100 btn mb-2 mt-3' to="/">Playground</Link>
          <button className='w-100 btn bg-red' onClick={signout}>Sign out</button>
        </div>

        <div className='w-100 p-1 overflow'>
          <ul className='w-100 grid-3'>
            {pastes && pastes.map(p => <li className='bg-dark border p-1 br7 text-center shadow' key={p.id}>
              <h1 className='m-0 fs-70'><i className='fa fa-file'></i></h1>
              <Link to={"/?p=" + p.id}><h3>{p.filename}</h3></Link>
              <small> {new Date(p.created_at).toDateString()}</small>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }
  else {
    return <Spinner />
  }
}
