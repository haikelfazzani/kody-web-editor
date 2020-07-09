import React, { useState } from 'react';
import { DropboxService, DropboxAuth } from '../../services/DropboxService';
import { withRouter } from 'react-router-dom';

function FormSavePaste (props) {

  const [isSaved, setIsSaved] = useState(false);
  const [snippetUrl, setSnippetUrl] = useState(null);

  const onSaveSnippet = (e) => {
    e.preventDefault();

    let getTabs = localStorage.getItem('kody-tabs');

    if (getTabs && JSON.parse(getTabs).length === 3) {

      getTabs = JSON.parse(getTabs);
      getTabs = [getTabs[0], `<style>${getTabs[1]}</style>`, `<script type="text/babel">${getTabs[2]}</script>`];

      DropboxService.uploadFile(e.target.elements[0].value, getTabs.join('\n'))
        .then(r => {
          if (r) {
            setSnippetUrl(r);
            setIsSaved(r);
          }
        })
        .catch(e => {
          props.history.push('/')
        });
    }
  }

  return (<>
    {DropboxAuth.getToken() && <>

      <form className="bg-p" onSubmit={onSaveSnippet}>

        <div className="form-group mb-0">
          <label htmlFor="filename">file name</label>
          <input type="text" className="form-control" placeholder="Main" required />
        </div>

        <small className="form-text text-white fs-10 text-uppercase mb-2">* Dropbox authentification required</small>

        <button type="submit" className="btn btn-warning btn-block" disabled={isSaved}>
          <i className="fab fa-dropbox"></i> save snippet
      </button>
      </form>

      {isSaved
        && <div className="alert alert-success d-flex flex-column" role="alert">
          <strong><i className="fas fa-file-code"></i> {snippetUrl.name}</strong>
          <small><i className="fas fa-clock"></i> {snippetUrl.server_modified}</small>
        </div>}

    </>}
  </>
  );
}

export default withRouter(FormSavePaste);
