import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function AddLibrary () {

  const libraries = useStoreState(actions => actions.webeditor.model.libraries);
  const { addLibrary, onRemoveLibrary } = useStoreActions(actions => actions.webeditor);

  const [state, setState] = useState({
    isModelOpen: false,
    library: ''
  });

  const onNewLibrary = (e) => {
    let library = e.target.value;
    if (library.length > 25) { setState({ ...state, library }); }
  }

  const onAddPlus = () => {
    if (state.library.length > 25) {
      setState({ ...state, library: '' });
      addLibrary(state.library.trim());
    }
  }

  const onRmLib = (lib) => {
    onRemoveLibrary(lib);
  }

  return (<>

    <button className="btn btn-primary ml-3 mr-3" onClick={() => { setState({ ...state, isModelOpen: !state.isModelOpen }) }}>
      <i className="fas fa-plus"></i> library
    </button>


    <div style={{ display: state.isModelOpen ? 'block' : 'none' }}>

      <form className="form-inline">
        <input
          type="text"
          name="add-library"
          className="w-85 py-1 pl-2"
          onChange={onNewLibrary}
          value={state.library}
          placeholder="example: https://code.jquery.com/jquery-3.5.1.min.js"
          required
        />
        <button onClick={onAddPlus} className="btn btn-success btn-block w-15">
          <i className="fa fa-plus"></i>
        </button>
      </form>

      {libraries.length > 0
        && <ul className="mt-3 list-group">
          {libraries.map((lib, i) => <li key={'lib' + i}
            className="list-group-item d-flex justify-content-between align-items-center">
            <span><i className="fas fa-external-link-square-alt mr-1"></i> {lib}</span>
            <button className="badge badge-danger" onClick={() => { onRmLib(lib) }}>
              <i className="fa fa-trash"></i>
            </button>
          </li>)}
        </ul>}

    </div>

  </>);
}