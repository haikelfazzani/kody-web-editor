import React, { useEffect, useState } from 'react';
import PastebinService from '../services/PastebinService';
import { Link } from 'react-router-dom';

export default function ListPastes () {

  const [pastes, setPastes] = useState(null);

  useEffect(() => {
    PastebinService.getPastes()
      .then(r => {
        console.log(r);
        
        if (Array.isArray(r)) setPastes(r);
      })
      .catch(e => { });
  }, []);

  return (
    <ul className="list-group">
      {pastes && pastes.map(paste =>
        <li className="list-group-item d-flex justify-content-between align-items-center" key={paste.paste_key}>
          <Link to={"/playground/" + paste.paste_key}>
            <i className="far fa-file-code mr-3"></i>
            <span>{paste.paste_title}</span>
          </Link>
          <a className="badge badge-primary badge-pill" href={paste.paste_url}><i className="fa fa-link"></i></a>
        </li>)}
    </ul>
  );
}