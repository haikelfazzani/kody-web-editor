import React from 'react';
import download from '../util/download';
import tabsToString from '../util/tabsToString';

const Modal = React.lazy(() => import('../components/Modal'));
const AddPackage = React.lazy(() => import('./settings/AddPackage'));
// const FormSavePaste = React.lazy(() => import('./settings/FormSavePaste'));
const Timer = React.lazy(() => import('./settings/Timer'));

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

export default function Settings() {

  const onTheme = () => {

  }

  const onDownload = async () => {
    // let code = await tabsToString(preprocessors);
    // download(code, 'kody.html');
  }

  const onLoadFromDesktop = () => {
    document.getElementById('desktop-file').click();
  }

  const onLoadFile = (e) => {
    let file = e.target.files.item(0);
    if (file && file.type === 'text/html') {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        //setEditorValue(reader.result);
      };
    }
  }

  return (<>
    <li className="d-flex align-items-center list-group-item pr-0 pl-0">

    </li>

    <input type="file" name="desktop-file" id="desktop-file" onChange={onLoadFile} hidden />
    {/* 
      <Modal icon="fa fa-archive"><AddPackage /></Modal>
      <Modal><FormSavePaste /></Modal> */}
    {/* <li className="d-flex align-items-center list-group-item pr-0 pl-0"><Timer /></li> */}
    <li className="d-flex align-items-center list-group-item" onClick={onLoadFromDesktop}><i className="fa fa-folder-open"></i></li>
    <li className="d-flex align-items-center list-group-item" onClick={onDownload}><i className="fa fa-download"></i></li>
    <li className="d-flex align-items-center list-group-item" onClick={onTheme} title="Change Theme"><i className="fa fa-sun"></i></li>
  </>);
}