import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import { supabase } from '../util/supabaseClient';
import Spinner from '../components/Spinner'

export default function Account() {
  const authSession = useAuth();
  const [pastes, setPastes] = useState(null)

  useEffect(() => {    
    if (!authSession || !authSession.user_metadata) return;

    (async () => {
      const { data } = await supabase.from('pastes').select().eq('user_email', authSession.user_metadata.email);
      setPastes(data);
    })();

    return () => {

    }
  }, [authSession]);

  if (authSession && authSession.user_metadata) {
    const user = authSession.user_metadata;
    return (
      <div className='vh-100 grid-1-3'>
        <div className='w-100 border-right text-center p-2'>
          <img className='w-100 rounded' src={user.avatar_url} alt={user.user_name} />
          <h4>{user.name}</h4>
          <small>last sign in at: {new Date(authSession.last_sign_in_at).toDateString()}</small>
          <Link className='w-100 btn mt-3' to="/">home</Link>
        </div>

        <div>
          <ul className='w-100 grid-2'>
            {pastes && pastes.map(p => <li className='border p-1 br7 text-center shadow' key={p.id}>
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
