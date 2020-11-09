import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CDNService from '../../services/CDNService';

export default function AddPackage () {

  const [packages, setPackages] = useState(null);
  const { resources } = useStoreState(state => state.editorModel);
  const { setResources } = useStoreActions(actions => actions.editorModel)

  const onSearch = async (e) => {
    e.preventDefault();
    let packages = await CDNService.search(e.target.elements[0].value);
    setPackages(packages);
  }

  const onAdd = (p) => {
    let tmp = resources.slice(0);
    if (!tmp.find(v => v.name === p.name)) {
      tmp.push(p);
      setResources(tmp);
    }
  }

  const onRemove = (p) => {
    let tmp = resources.slice(0);
    tmp = tmp.filter(v => v.name !== p.name);
    setResources(tmp);
  }

  return (<div className="w-100 mt-3">

    <div className="w-100 pl-3 pr-3 mb-3">
      <span className="text-uppercase"><i className="fa fa-cube"></i> Resources({resources.length})</span>
      {resources && <ul>
        {resources.map((p, i) => <li key={'p' + i} className="d-flex justify-content-between">
          <span>{p.name}({p.version}) </span>
          <span onClick={() => { onRemove(p); }}><i className="fa fa-trash text-danger"></i></span>
        </li>)}
      </ul>}
    </div>

    <form onSubmit={onSearch} className="w-100 pl-3 pr-3">
      <div className="w-100 form-group">
        <input type="text" className="form-control" placeholder="react" required />
      </div>
      <button type="submit" className="w-100 btn btn-warning"><i className="fa fa-search"></i> Search</button>
    </form>

    {packages && <div className="list-packages w-100 pl-3 pr-3 mt-3">
      <span className="text-uppercase">add packages</span>
      <ul>
        {packages.map((p, i) => <li key={'p' + i} onClick={() => { onAdd(p); }}>{p.name}({p.version})</li>)}
      </ul>
    </div>}
  </div>);
}