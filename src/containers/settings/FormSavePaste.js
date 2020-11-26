import React, { useState } from 'react';
import { DropboxAuth } from '../../services/DropboxService';
import { withRouter } from 'react-router-dom';
import PasteService from '../../services/PasteService';
import { useStoreState } from 'easy-peasy';
import tabsToString from '../../util/tabsToString';

function FormSavePaste () {

  const { resources, template } = useStoreState(state => state.editorModel);
  const [pasteService, setPasteService] = useState('pastebin');
  const [isSaved, setIsSaved] = useState(false);
  const [snippetInfos, setSnippetInfos] = useState({
    url: null,
    id: null
  });

  const onSaveSnippet = (e) => {
    e.preventDefault();
    if (pasteService) {
      let code = tabsToString(resources, template);
      let pService = e.target.elements[0].value;
      let filename = e.target.elements[1].value;
      let expire_date = e.target.elements[2].value;

      let data = { filename, code, expire_date };

      PasteService.savePaste(pService, data)
        .then(url => {
          let lIndx = url.lastIndexOf('/');
          let id = url.slice(lIndx + 1);
          setSnippetInfos({ id, url });
          setIsSaved(url !== null);

          setTimeout(() => {
            setIsSaved(false);
          }, 5000);
        })
        .catch(e => {
          setSnippetInfos({ id: null, url: e.message });
          setIsSaved(false);
        });
    }
  }

  return (<>
    <form className="w-100" onSubmit={onSaveSnippet}>

      <div className="form-group">
        <label htmlFor="pasteService"><i className="fa fa-database"></i> service</label>
        <select className="form-control" id="pasteService" onChange={(e) => { setPasteService(e.target.value); }} value={pasteService}>
          <option value="pastebin">pastebin</option>
          <option value="hastebin">hastebin</option>
          {DropboxAuth.getToken() && <option value="dropbox">dropbox</option>}
        </select>
      </div>

      <div className="form-group mb-0">
        <label htmlFor="filename"><i className="fa fa-file"></i> file name</label>
        <input type="text" className="form-control" placeholder="Main" required readOnly={isSaved} />
      </div>

      {pasteService !== 'dropbox' && <div className="form-group mt-3">
        <label htmlFor="expire_date"><i className="fa fa-clock"></i> expire date</label>
        <select className="form-control" name="expire_date" required>
          <option value="10M">10 minutes</option>
          <option value="1H">1 hour</option>
          <option value="1D">1 day</option>
          <option value="1W">1 week</option>
          <option value="1M">1 month</option>
          <option value="1Y">1 year</option>
        </select>
      </div>}

      {pasteService === 'dropbox' && <small className="form-text text-white fs-10 text-uppercase mb-2">* You need to be signed in to save this sandbox to Dropbox.</small>}

      <button type="submit" className="btn btn-warning btn-block" disabled={isSaved}>
        <i className="fab fa-dropbox"></i> save paste
      </button>
    </form>

    {snippetInfos.id && snippetInfos.url &&
      <div className="w-50 form-group py-3 pr-3 pl-3 bg-dark text-white border-top">

        <label htmlFor="pasteService"><i className="fa fa-database"></i> {pasteService} paste url</label>
        <input type="url" className="form-control mb-3" defaultValue={snippetInfos.url} readOnly />

        <label htmlFor="pasteService"><i className="fa fa-database"></i> kody paste url</label>
        <input
          type="text"
          className="form-control"
          defaultValue={`${window.location.origin}/playground/${pasteService}/${snippetInfos.id}`}
          readOnly
        />
      </div>}
  </>);
}

export default withRouter(FormSavePaste);
