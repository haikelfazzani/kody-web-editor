import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner'
import SuperbaseService from '../services/SuperbaseService';
import { withRouter } from 'react-router-dom';

function Account(props) {
  const authSession = useAuth();
  const [pastes, setPastes] = useState(null)

  useEffect(() => {
    if (!authSession || !authSession.user_metadata) return;

    (async () => {
      try {
        const data = await SuperbaseService.getAllPastes(authSession.user_metadata.email);
        setPastes(data);
      } catch (error) {
        props.history.push('/login')
      }
    })();
  }, [authSession]);

  const onDeletePaste = async paste => {
    if (window.confirm('Do you really want to delete this paste? ' + paste.filename)) {
      const data = await SuperbaseService.deletePaste(paste.id);

      if (data) {
        let temp = pastes.slice(0);
        temp = temp.filter(p => p.id !== paste.id);
        setPastes(temp);
      }
    }
  }

  const signout = async () => {
    await SuperbaseService.signout()
  }

  if (authSession && authSession.user_metadata) {
    const user = authSession.user_metadata;
    return (
      <div className='grid-1-3 border br7 overflow-h' style={{ height: 'calc(100vh - 15px)' }}>
        <div className='w-100 border-right text-center p-2 bg-dark'>
          <img className='w-100 rounded' src={user.avatar_url} alt={user.user_name} />
          <h3>{user.name}</h3>
          <p>last sign in at: {new Date(authSession.last_sign_in_at).toDateString()}</p>
          <Link className='w-100 btn mb-2 mt-3' to="/"><i className='fa fa-terminal mr-1'></i>Playground</Link>
          <button className='w-100 btn bg-red' onClick={signout}>Sign out</button>
        </div>

        <div className='w-100 p-1 overflow'>

          <ul className='w-100 grid-3'>
            {pastes && pastes.map(p => <li className='bg-dark border p-1 br7 text-center shadow' key={p.id}>
              <h1 className='m-0 fs-70'><i className='fa fa-file'></i></h1>
              <Link to={"/?p=" + p.id}><h3>{p.filename}</h3></Link>
              <small> {new Date(p.created_at).toDateString()}</small>
              <button className='mx-auto btn red mt-2' onClick={() => { onDeletePaste(p) }}>
                <i className='fa fa-trash mr-1'></i>delete</button>
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

export default withRouter(Account)