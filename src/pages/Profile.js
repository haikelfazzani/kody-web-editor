import React from 'react';
import ListPastes from '../components/ListPastes';
import imgProfile from '../img/bg.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profile () {
  return (<div className="home-page mb-5">

    <Navbar />

    <div className="container">
      <div className="row">

        <div className="col-md-4">
          <div class="card">
            <img src={imgProfile} class="card-img-top" alt="..." className="w-100" />
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>


        <div className="col-md-8">
          <ListPastes />
        </div>

      </div>
    </div>

    <Footer />
  </div>);
}