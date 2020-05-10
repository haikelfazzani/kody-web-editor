import React, { useState } from 'react';
import AppUtil from '../../util/AppUtil';
import './Sidebar.css';
import ButtonInput from './ButtonInput';
import SelectFont from './SelectFont';

export default function Sidebar () {

  const [isSideOpen, setIsSideOpen] = useState(false);

  const onDownload = () => {
    AppUtil.generateTemplateAndDownload();
  }

  const onOpenSideBar = () => { setIsSideOpen(!isSideOpen); }

  return (<div className="sidebar">

    <div style={{ display: isSideOpen ? 'block' : 'none' }}>

      <SelectFont />

      <ButtonInput />

      <button className="btn btn-primary btn-block" onClick={onDownload}>
        <i className="fas fa-download"></i>
      </button>
    </div>

    <button className="btn btn-primary mt-2" onClick={onOpenSideBar}>
      <i className="fa fa-cogs"></i>
    </button>
  </div>);
}