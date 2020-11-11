import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function AddPackage () {

  const { resources } = useStoreState(state => state.editorModel);
  const { setResources } = useStoreActions(actions => actions.editorModel)

  const onAdd = (e) => {
    e.preventDefault();

    let name = e.target.elements[0].value;
    let version = e.target.elements[1].value;
    let latest = e.target.elements[2].value;

    let tmp = resources.slice(0);
    if (!tmp.find(v => v.name === name)) {
      tmp.push({ name, version, latest });
      setResources(tmp);
    }
  }

  const onRemove = (p) => {
    let tmp = resources.slice(0);
    tmp = tmp.filter(v => v.name !== p.name);
    setResources(tmp);
  }

  return (<div className="w-100 mt-3">

    <form onSubmit={onAdd} className="w-100 pl-3 pr-3 mb-3">
      <div className="w-100 form-group">
        <input type="text" className="form-control" placeholder="vue" required />
      </div>
      <div className="w-100 form-group">
        <input type="text" className="form-control" placeholder="3.0.2" required />
      </div>
      <div className="w-100 form-group">
        <input type="text" className="form-control" placeholder="https://unpkg.com/vue@3.0.2" required />
        <small className="text-danger">* Add only javascript packages</small>
      </div>

      <button type="submit" className="w-100 btn btn-warning"><i className="fa fa-plus"></i> Add package</button>
    </form>

    <hr />

    <ul className="pl-3 pr-3">
      <li className="text-uppercase"><i className="fa fa-cube"></i> Resources ({resources.length})</li>
      {resources && resources.map((p, i) => <li key={'p' + i} className="d-flex justify-content-between pl-3">
        <span className="text-muted"><i className="fa fa-thumbtack"></i> {p.name}({p.version}) </span>
        <span onClick={() => { onRemove(p); }}><i className="fa fa-trash text-danger"></i></span>
      </li>)}
    </ul>
  </div>);
}