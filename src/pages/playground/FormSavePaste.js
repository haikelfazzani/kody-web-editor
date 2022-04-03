import React, { useState } from 'react';
import { DropboxService } from '../../services/DropboxService';
import { Link, withRouter } from 'react-router-dom';
import tabsToHTML from '../../util/tabsToHTML';

function FormSavePaste() {
  const [fileInfos, setFileInfos] = useState();
  const [errMsg, setErrMsg] = useState(null)

  const onSaveSnippet = async (e) => {
    e.preventDefault();
    try {
      let filename = e.target.elements[0].value;
      let html = tabsToHTML(JSON.parse(localStorage.getItem('tabs')))
      const response = await DropboxService.uploadFile(filename, html);
      setFileInfos(response);
    } catch (error) {
      setErrMsg(error.message);
    }
  }

  return (<>
    <form className="w-100" onSubmit={onSaveSnippet}>

      <label className='text-uppercase' htmlFor="filename"><i className="fa fa-file"></i> file name</label>
      <input type="text" className="w-100 mb-1 mt-1" placeholder="Main" required readOnly={fileInfos} />

      <Link to="/login" className="form-text text-white fs-10 text-uppercase mb-2">* Dropbox sign in is required.</Link>

      <button type="submit" className="btn mt-1 br7" disabled={fileInfos}>
        <i className="fa fa-save mr-1"></i>save paste
      </button>
    </form>

    {fileInfos && <ul className='w-100 d-flex justify-between'>
      <li className='green'>Saved</li>
      <li>{fileInfos.name}</li>
      <li>{fileInfos.size}</li>
    </ul>}

    {errMsg && <p className='red'>{errMsg}</p>}
  </>);
}

export default withRouter(FormSavePaste);
