import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SuperbaseService from '../../services/SuperbaseService';

function FormSavePaste() {
  const authSession = useAuth();
  const [fileInfos, setFileInfos] = useState();
  const [errMsg, setErrMsg] = useState(null);

  const onSaveSnippet = async (e) => {
    e.preventDefault();
    if (!authSession || !authSession.user_metadata) return;

    try {
      let filename = e.target.elements[0].value;
      const tabsAsString = localStorage.getItem('tabs');

      const response = await SuperbaseService.savePaste({
        filename,
        content: tabsAsString,
        user_email: authSession.user_metadata.email
      });

      setErrMsg('Paste is saved successfully:' + response.id);

      e.target.reset();
    } catch (error) {
      setErrMsg(error.message);
    }
  }

  return (<>
    <form className="w-100" onSubmit={onSaveSnippet}>

      <label className='text-uppercase' htmlFor="filename"><i className="fa fa-file"></i> file name</label>
      <input type="text" className="w-100 mb-1 mt-1" placeholder="Main" required readOnly={fileInfos} />

      <Link to="/login" className="form-text text-white fs-10 text-uppercase mb-2">* Dropbox sign in is required.</Link>

      <button type="submit" className="btn mt-3 br7" disabled={fileInfos}>
        <i className="fa fa-save mr-1"></i>save paste
      </button>
    </form>

    {errMsg && <p className='red'>{errMsg}</p>}
  </>);
}

export default withRouter(FormSavePaste);
