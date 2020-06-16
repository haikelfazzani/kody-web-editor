import React, { useState } from 'react';
import debounce from '../util/debounce';
import PastebinService from '../services/PastebinService';

const expireDates = {
  '10M': '10 Minutes',
  '1H': '1 Hour',
  '1D': '1 Day',
  '1W': '1 Week',
  '2W': '2 Weeks',
  '1M': '1 Month',
  '6M': '6 Months',
  '1Y': '1 Year',
  'N': 'Never',
}

export default function FormSavePaste () {

  const [isSaved, setIsSaved] = useState(false);
  const [snippetUrl, setSnippetUrl] = useState(null);

  const onSaveSnippet = (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    let expireDate = elements[1].value;
    let filename = elements[0].value;

    debounce(() => {
      PastebinService.createPaste(filename, expireDate)
        .then(r => {
          setSnippetUrl(r);
          setIsSaved(true);
        })
        .catch(e => {
          setSnippetUrl(e.message);
          setIsSaved(false);
        });
    }, 1000)();
  }

  return (<>
    <form className="bg-p" onSubmit={onSaveSnippet}>

      <div className="form-group">
        <label htmlFor="filename">file name</label>
        <input type="text" className="form-control" placeholder="Main" required />
      </div>

      <div className="form-group">
        <label htmlFor="expired-date">Expired date</label>
        <select className="form-control">
          {Object.keys(expireDates).map(d => <option key={d} value={d}>{expireDates[d]}</option>)}
        </select>
      </div>

      <button type="submit" className="btn btn-warning btn-block" disabled={isSaved}>
        <i className="fa fa-save"></i> save snippet
      </button>
    </form>

    {isSaved && <><div className="form-group">
      <label htmlFor="snippet-name">Snippet url</label>
      <input type="text" className="form-control" value={snippetUrl} readOnly />
    </div>
      <a href={snippetUrl} target="_blank" rel="noopener noreferrer" className="text-white">Open</a>
    </>}

  </>
  );
}