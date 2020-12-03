import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropboxService } from '../../services/DropboxService';

export default function UserInfos () {

  const [userInfos, setUserInfos] = useState(null);

  useEffect(() => {
    DropboxService.userAccount()
      .then((infos) => {
        if (infos) {
          setUserInfos(infos);
        }
      })
      .catch(e => {});
  }, []);

  if (userInfos && userInfos.name) {
    return (<div className="card text-dark">

      <img
        src={userInfos.profile_photo_url}
        className="card-img-top rounded-circle w-50 mx-auto"
        alt={userInfos.name.display_name}
      />

      <div className="card-body">
        <h5 className="card-title">{userInfos.name.display_name}</h5>
        <p className="card-text fs-12 text-muted">
          <i className="fa fa-envelope fs-12"></i> {userInfos.email}
        </p>

        <div className="btn-group" role="group" aria-label="Basic example">
          <Link to="/" className="btn btn-dark"><i className="fa fa-home fs-14"></i></Link>
          <Link to="/playground" className="btn btn-dark"><i className="fa fa-terminal fs-14"></i></Link>
        </div>

      </div>
    </div>);
  }
  else {
    return <div></div>
  }
}