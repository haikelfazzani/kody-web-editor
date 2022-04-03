import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthService } from '../../services/AuthService';
import { DropboxService } from '../../services/DropboxService';

function UserInfos(props) {

  const [userInfos, setUserInfos] = useState(null);

  useEffect(() => {
    DropboxService.userAccount()
      .then((infos) => {
        if (infos) {
          setUserInfos(infos);
        }
      })
      .catch(e => {
        props.history.push('/login')
      });
  }, []);

  const onLogout = () => {
    AuthService.logout();
  }

  if (userInfos && userInfos.name) {
    return (<div className="h-100 d-flex flex-column align-center text-center mt-3">
      <img
        className='rounded'
        src={userInfos.profile_photo_url}
        alt={userInfos.name.display_name}
      />

      <div >
        <h5>{userInfos.name.display_name}</h5>
        <p><i className="fa fa-envelope fs-12"></i> {userInfos.email}</p>

        <button onClick={onLogout} className="w-100 btn">
          <i className="fab fa-dropbox mr-1"></i>logout
        </button>
        <Link to="/" className="btn"><i className="fa fa-terminal mr-1"></i>Playground</Link>
      </div>
    </div>);
  }
  else {
    return <div></div>
  }
}

export default withRouter(UserInfos)