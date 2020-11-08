import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import FormSavePaste from './FormSavePaste';
import templates from '../../util/templates';
import Timer from './Timer';

import './Sidebar.css';
import DropDown from '../DropDown';

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

      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary changes d-flex"></button>
        <button type="button" className="btn btn-primary"><i className="fas fa-compress"></i></button>
        <a href="https://github.com/haikelfazzani/kody-web-editor" className="btn btn-primary"><i className="fab fa-github"></i></a>
      </div>


        <FormSavePaste />

        <hr className="my-3" />

        <DropDown
          text="Font Size"
          items={fontSizes}
          onSelectItem={setFontSize}
          selectedItem={fontSize}
        />

        <div className="mb-3"></div>

        <DropDown
          text="Template"
          items={Object.keys(templates)}
          onSelectItem={setTemplate}
          selectedItem={template}
        />

        {/* <p className="text-white"><i className="fab fa-sass"></i> Enbale sass</p>
          <button className="btn btn-light btn-block"><i className="fab fa-sass"></i> Enable Sass</button> */}

        <hr className="my-3" />

        <Timer />

        <hr className="my-3" />

        <button className="btn btn-light btn-block mb-2"><i className="fas fa-share"></i></button>
        <button className="btn btn-light btn-block mb-2"><i className="fas fa-code"></i></button>
        <button className="btn btn-light btn-block mb-2"><i className="fas fa-download"></i></button>

      </div>
    </nav>
  );
}