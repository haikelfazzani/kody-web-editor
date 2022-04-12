import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import FormSavePaste from './menu/FormSavePaste';
import EditorOptions from './menu/EditorOptions';
import Template from './menu/Template';
import DownloadButton from './menu/DownloadButton';
import Tab from './menu/Tab';
import AddLib from './menu/AddLib';

export default function Menu() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showEditorOptionsModal, setShowEditorOptionsModal] = useState(false);
  const [showAddLibModal, setAddLibModal] = useState(false);

  return <header className='w-100 d-flex justify-between align-center'>

    <Tab />

    <ul className='h-100 d-flex align-center'>
      <li><Template /></li>
      <li title="Download Code"><DownloadButton /></li>
      <li title='Add Library' onClick={() => { setAddLibModal(!showAddLibModal); }}><i className='fa fa-archive'></i></li>
      <li title='Save Paste' onClick={() => { setShowSaveModal(!showSaveModal); }}><i className='fa fa-save'></i></li>
      <li title='EditorOptions' onClick={() => { setShowEditorOptionsModal(!showEditorOptionsModal); }}><i className='fa fa-cog'></i></li>
      <li title='Show Profile'><Link to="/profile"><i className="fas fa-user text-white"></i></Link></li>
    </ul>

    <Modal showModal={showAddLibModal} setShowModal={setAddLibModal}><AddLib /></Modal>
    <Modal showModal={showEditorOptionsModal} setShowModal={setShowEditorOptionsModal}><EditorOptions /></Modal>
    <Modal showModal={showSaveModal} setShowModal={setShowSaveModal}><FormSavePaste /></Modal>
  </header>
}
