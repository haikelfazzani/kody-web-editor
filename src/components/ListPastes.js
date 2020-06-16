import React, { useEffect, useState } from 'react';
import PastebinService from '../services/PastebinService';

export default function ListPastes () {

  const [pastes, setPastes] = useState(null);

  useEffect(() => {
    PastebinService.getPastes()
      .then(r => {
        if (Array.isArray(r)) setPastes(r);
      })
      .catch(e => { });
  }, []);

  return (
    <ul className="list-group">
      {pastes && pastes.map(paste =>
        <li className="list-group-item d-flex justify-content-between align-items-center" key={paste.paste_key}>
          <a href={paste.paste_url}>{paste.paste_title}</a>
          <span className="badge badge-primary badge-pill">{paste.paste_expire_date}</span>
        </li>)}
    </ul>
  );
}