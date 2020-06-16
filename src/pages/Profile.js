import React, { useEffect, useState } from 'react';
import ListPastes from '../components/ListPastes';
import imgProfile from '../img/bg.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PastebinService from '../services/PastebinService';

export default function Profile () {

  const [user, setUser] = useState(null);

  useEffect(() => {
    PastebinService.getUserInfo()
      .then(r => {
        //console.log(r);
        setUser(r.user)
      })
      .catch(e => {
        //console.log(e);
      });
  }, []);

  return (<div className="home-page mb-5">

    <Navbar />

    {user && <div className="container">
      <div className="row">

        <div className="col-md-3">
          <div className="card">
            <img src={user.user_avatar_url} className="card-img-top" alt="..." className="w-100" />
            <div className="card-body">
              <p className="card-text"><i className="fa fa-user fs-14"></i> {user.user_name}</p>
              <p className="card-text"><i className="fa fa-map fs-14"></i> {user.user_location}</p>
            </div>
          </div>
        </div>


        <div className="col-md-9">
          <ListPastes />
        </div>

      </div>
    </div>}

    <Footer />
  </div>);
}