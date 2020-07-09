import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import FormSavePaste from './FormSavePaste';
import templates from '../../util/templates';
import Timer from './Timer';

import './Sidebar.css';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

export default function Sidebar () {

  const { template, fontSize } = useStoreState(state => state.editorModel);
  const { setTemplate, setFontSize } = useStoreActions(actions => actions.editorModel)
  const [show, setShow] = useState(false);

  const onShow = () => { setShow(!show); }

  return (
    <nav className={"nav " + (show ? 'nav-open' : '')}>

      <div>
        <button className="nav__toggle" onClick={onShow}>{show ? 'X' : '+'}</button>
      </div>

      <div className="sidebar-content">

        <FormSavePaste />

        <div className="w-100 bg-p">
          <div className="form-group">
            <label><i className="fa fa-pen"></i> Font Size ({fontSize})</label>
            <select className="form-control" onChange={(e) => { setFontSize(e.target.value); }}>
              {fontSizes.map(font => <option key={font}>{font}</option>)}
            </select>
          </div>

          <div className="form-group mb-3">
            <label><i className="fa fa-file"></i> Templates ({template})</label>
            <select className="form-control"
              onChange={(e) => { setTemplate(e.target.value); }}>
              {Object.keys(templates).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* <p className="text-white mb-1"><i className="fab fa-sass"></i> Enbale sass</p>
          <button className="btn btn-light btn-block"><i className="fab fa-sass"></i> Enable Sass</button> */}
        </div>

        <Timer />

        <div className="btn-group mt-3">
          <button className="btn btn-light"><i className="fas fa-share"></i></button>
          <button className="btn btn-light"><i className="fas fa-code"></i></button>
          <button className="btn btn-light"><i className="fas fa-download"></i></button>
        </div>

      </div>
    </nav>
  );
}