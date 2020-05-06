import React, { useState } from 'react';
import copyToClipboard from '../../util/copyToClipboard';
import AddLibrary from './AddLibrary';

export default function ButtonInput () {

  const [state, setState] = useState({
    openInput: false,
    actionName: 'add Library',
    inputValue: ''
  });

  const onSetAction = (actionName) => {
    setState({ ...state, openInput: true, actionName, inputValue: '' });
  }

  const onInputChange = (e) => { setState({ ...state, inputValue: e.target.value }); }

  const onAction = () => {
    switch (state.actionName) {
      case 'share':
        let codeResultt = localStorage.getItem('kody-tabs');

        const encodedData = window.btoa(codeResultt);
        let url = window.location.origin + '/playground?bin=' + encodedData;

        copyToClipboard(url);
        setState({ ...state, inputValue: url });
        break;

      case 'embed':
        let codeResult = localStorage.getItem('kody-tabs');

        if (codeResult) {
          const encodedData = window.btoa(codeResult);
          let url = window.location.origin + '/playground?bin=' + encodedData;

          url = `<iframe src="${url}" title="kody" width="500" height="500"></iframe>`;

          copyToClipboard(url);
          setState({ ...state, inputValue: url });
        }
        break;

      default:
        break;
    }
  }

  return (<div className="btn-input">

    <AddLibrary />

    <button className="btn btn-primary mr-3" onClick={() => { onSetAction('share') }}>
      <i className="fas fa-share"></i> share
    </button>

    <button className="btn btn-primary mr-3" onClick={() => { onSetAction('embed') }}>
      <i className="fas fa-code"></i> embed
    </button>

    <div style={{ display: state.openInput ? 'block' : 'none' }}>

      <textarea
        type="text"
        name="action"
        className="form-control mb-3"
        onChange={onInputChange}
        value={state.inputValue}
        placeholder={state.actionName}
        rows="6"
        required
      />

      <button className="btn btn-success mr-3" onClick={onAction}>
        <i className="fa fa-recycle"></i> Generate and copy url
      </button>

      <button className="btn btn-danger" onClick={() => { setState({ ...state, openInput: false }); }}>
        <i className="fa fa-times"></i> Close
      </button>
    </div>
  </div>);
}