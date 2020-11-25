import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CDNService from '../../services/CDNService';

export default function AddPackage () {

  const { resources } = useStoreState(state => state.editorModel);
  const { setResources } = useStoreActions(actions => actions.editorModel);
  const [searchResults, setSearchResults] = useState(null);

  const onAdd = (libURL) => {
    let cdnUrl = `<script src="${libURL}"></script>`;

    let tmp = resources.slice(0);
    if (!resources.includes(cdnUrl)) {
      tmp.push(cdnUrl);
      setResources(tmp);
    }
  }

  const onSubmitLib = (e) => {
    e.preventDefault();
    onAdd(e.target.elements[0].value);
  }

  const onSearch = async (e) => {
    e.preventDefault();
    let result = await CDNService.search(e.target.elements[0].value);
    setSearchResults(result);
  }

  return (<div className="w-100 text-white mt-3">

    <p className="border-bottom text-uppercase pb-2"><i className="fa fa-box-open"></i> Search for Library</p>

    <form onSubmit={onSearch} className="w-100 mb-3">
      <div className="w-100 form-group">
        <label htmlFor="lib-name">Library name</label>
        <input type="text" name="lib-name" className="form-control" placeholder="react" required />
      </div>

      <button type="submit" className="w-100 btn btn-warning"><i className="fa fa-search"></i> CDNJS</button>
    </form>

    {searchResults && <ul className="list-group bg-dark overflow-auto" style={{ maxHeight: '300px' }}>
      {searchResults.map((c, i) => <li className="list-group-item fs-12 py-2 pr-2 pl-2 bg-transparent" key={c.name + '' + i}>
        <div className="w-100 d-flex justify-content-between align-items-center mb-2">
          <span>{c.name} {c.version}</span>
          <button type="button" onClick={() => { onAdd(c.latest); }} className="btn-inherit">
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        <input type="text" name="lib-name" className="form-control fs-12 p-0" defaultValue={c.latest} />
      </li>)}
    </ul>}

    <hr />

    <p className="border-bottom text-uppercase pb-2"><i className="fa fa-box-open"></i> Add Library</p>

    <form onSubmit={onSubmitLib} className="w-100 mb-3">
      <div className="w-100 form-group">
        <label htmlFor="cdn">URL</label>
        <input type="url" name="cdn" className="form-control" placeholder="https://unpkg.com/vue@3.0.2" required />
      </div>

      <button type="submit" className="w-100 btn btn-warning"><i className="fa fa-plus"></i> Library</button>
    </form>
  </div>);
}