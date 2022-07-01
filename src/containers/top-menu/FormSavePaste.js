import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SuperbaseService from '../../services/SuperbaseService';
import debounce from '../../util/debounce';

function FormSavePaste() {
  const authSession = useAuth();
  const [fileInfos, setFileInfos] = useState();
  const [errMsg, setErrMsg] = useState(null);

  const onSaveSnippet = async (e) => {
    e.preventDefault();

    setErrMsg(null);
    if (!authSession || !authSession.user_metadata) return;

    debounce(async () => {
      try {
        let filename = e.target.elements[0].value.replace(/[^a-z]/gi, '');

        const tabsAsString = localStorage.getItem('tabs');

        const response = await SuperbaseService.savePaste({
          filename,
          content: tabsAsString,
          user_email: authSession.user_metadata.email
        });

        setErrMsg('http://localhost:8888/?p=' + response.id);

        e.target.reset();
      } catch (error) {
        setErrMsg(error.message);
      }
    })()
  }

  return (<>
    <form className="w-100" onSubmit={onSaveSnippet}>

      <label className='text-uppercase' htmlFor="filename"><i className="fa fa-file"></i> file name</label>
      <input type="text" className="w-100 mb-1 mt-1" placeholder="Main" required readOnly={fileInfos} />

      <Link to="/login" className="form-text text-white fs-10 text-uppercase mb-2">* Sign in is required.</Link>

      <button type="submit" className="btn mt-3 br7" disabled={fileInfos}>
        <i className="fa fa-save mr-1"></i>save paste
      </button>
    </form>

    {errMsg && <input className='w-100 mt-2' type="text" defaultValue={errMsg} readOnly />}
  </>);
}

export default withRouter(FormSavePaste);
