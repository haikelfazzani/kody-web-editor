import React, { useState } from 'react';
import { DropboxAuth } from '../../services/DropboxService';
import { withRouter } from 'react-router-dom';
import PasteService from '../../services/PasteService';
import { useStoreState } from 'easy-peasy';
import download from '../../util/download';

function FormSavePaste () {

  const { resources, template } = useStoreState(state => state.editorModel);
  const [pasteService, setPasteService] = useState('pastebin');
  const [isSaved, setIsSaved] = useState(false);
  const [snippetUrl, setSnippetUrl] = useState(null);

  const tabsToString = () => {
    let getTabs = localStorage.getItem('kody-tabs');

    if (getTabs && JSON.parse(getTabs).length === 3) {

      let nResources = resources.reduce((a, r) => {
        return a + `<script src="${r.latest}"></script>`
      }, '');

      getTabs = JSON.parse(getTabs);
      let jsValue = getTabs[2];

      const cassets = ['react', 'preact'];
      let typeAsset = template !== 'coffeescript' ? 'text/javascript' : 'text/coffeescript';

      if (cassets.includes(template)) {
        jsValue = window.Babel.transform(getTabs[2], {
          envName: 'production',
          presets: ['react', 'es2015'],
          babelrc: false
        }).code;
      }

      getTabs = [
        nResources,
        getTabs[0],
        `<style>${getTabs[1]}</style>`,
        `<script type="${typeAsset}">${jsValue}</script>`
      ];

      return getTabs.join('\n');
    }
  }

  const onSaveSnippet = (e) => {
    e.preventDefault();
    if (pasteService) {
      let code = tabsToString();
      let pService = e.target.elements[0].value;
      let filename = e.target.elements[1].value;
      let expire_date = e.target.elements[2].value;

      let data = { filename, code, expire_date };

      PasteService.savePaste(pService, data)
        .then(pasteUrl => {
          setSnippetUrl(pasteUrl);
          setIsSaved(pasteUrl !== null);
        })
        .catch(e => {
          setSnippetUrl(e.message);
        });
    }
  }

  const onDownload = () => {
    let code = tabsToString();
    download(code, 'kody.html');
  }

  return (<>
    <div className="form-group pl-3 pr-3 mt-3">
      <button className="w-100 btn btn-dark" onClick={onDownload}><i className="fa fa-download"></i> download</button>
    </div>

    <hr />

    <form className="bg-p pl-3 pr-3 mt-3" onSubmit={onSaveSnippet}>

      <div className="form-group">
        <label htmlFor="pasteService">service</label>
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
        <label htmlFor="expire_date">expire date</label>
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

    <div className="form-group pl-3 pr-3 mt-3">
      {isSaved && <input type="url" className="form-control mb-3" defaultValue={snippetUrl} readOnly />}
    </div>
  </>
  );
}

export default withRouter(FormSavePaste);
