import React, { useState } from 'react';
import CDNService from '../services/CDNService';

export default function AddPackage () {
  const [searchResults, setSearchResults] = useState(null);

  const onAdd = (libURL) => {
    let cdnUrl = `<script src="${libURL}"></script>`;

  }

  const onSearch = async (e) => {
    e.preventDefault();
    let result = await CDNService.search(e.target.elements[0].value);
    setSearchResults(result);
  }

  return (<div className="w-100">
    <h4 className="border-bottom text-uppercase pb-2">
      <i className="fa fa-box-open"></i> Add Library
    </h4>

    <form onSubmit={onSearch} className="w-100">
      <div className="w-100 form-group">
        <label htmlFor="lib-name">Library name</label>
        <input type="text" name="lib-name" className="form-control" placeholder="react" required />
      </div>

      <button type="submit" className="w-100 btn btn-warning"><i className="fa fa-search"></i> Search</button>
    </form>

    {searchResults && <ul className="list-group bg-dark mt-3">
      {searchResults.map((c, i) => <li className="list-group-item fs-12 py-2 pr-2 pl-2 bg-transparent" key={c.name + '' + i}>
        <div className="w-100 d-flex justify-content-between align-items-center mb-2">
          <span>{c.name} {c.version}</span>
          <button type="button" onClick={() => { onAdd(c.latest); }} className="btn-inherit" title="Add To Project">
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
        <input type="text" name="lib-name" className="form-control fs-12" defaultValue={c.latest} />
      </li>)}
    </ul>}
  </div>);
}