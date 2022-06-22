import React, { useState,useCallback } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import FormSavePaste from './FormSavePaste';
import EditorOptions from './EditorOptions';
import Template from './Template';

import download from '../../util/download';
import tabsToHTML from '../../util/tabsToHTML';

import Tab from './Tab';
import AddLib from './AddLib';

export default function Menu() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showEditorOptionsModal, setShowEditorOptionsModal] = useState(false);
  const [showAddLibModal, setAddLibModal] = useState(false);

  const onDownload = useCallback(() => {
    download(tabsToHTML(), 'kody.html');
  }, []);

  return <header className='w-100 d-flex justify-between align-center'>

    <Tab />

    <ul className='h-100 d-flex align-center'>
      <li><Template /></li>
      <li title="Download Code"><button className='white' onClick={onDownload}><i className="fa fa-download"></i></button></li>
      <li title='Add Library' onClick={() => { setAddLibModal(!showAddLibModal); }}><i className='fa fa-archive'></i></li>
      <li title='Save Paste' onClick={() => { setShowSaveModal(!showSaveModal); }}><i className='fa fa-save'></i></li>
      <li title='EditorOptions' onClick={() => { setShowEditorOptionsModal(!showEditorOptionsModal); }}><i className='fa fa-cog'></i></li>
      <li title='Show Account'><Link to="/account"><i className="fas fa-user text-white"></i></Link></li>
    </ul>

    <Modal showModal={showAddLibModal} setShowModal={setAddLibModal}><AddLib /></Modal>
    <Modal showModal={showEditorOptionsModal} setShowModal={setShowEditorOptionsModal}><EditorOptions /></Modal>
    <Modal showModal={showSaveModal} setShowModal={setShowSaveModal}><FormSavePaste /></Modal>
  </header>
}
