import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import DropDown from '../../components/DropDown';
import templates from '../../util/templates';

import download from '../../util/download';
import tabsToString from '../../util/tabsToString';

const Modal = React.lazy(() => import('../../components/Modal'));
const AddPackage = React.lazy(() => import('./AddPackage'));
const FormSavePaste = React.lazy(() => import('./FormSavePaste'));
const Timer = React.lazy(() => import('./Timer'));

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

export default function Settings () {

  const { preprocessors, template, fontSize } = useStoreState(state => state.editorModel);
  const { setTemplate, setFontSize } = useStoreActions(actions => actions.editorModel);

  const onDownload = async () => {
    let code = await tabsToString(preprocessors);
    download(code, 'kody.html');
  }

  return (
    <ul className="list-group d-flex">
      <li className="d-flex align-items-center list-group-item pr-0 pl-0">
        <DropDown
          text="Template"
          items={Object.keys(templates)}
          onSelectItem={setTemplate}
          selectedItem={template}
        />
      </li>

      <li className="d-flex align-items-center list-group-item pr-0 pl-0">
        <DropDown
          text="Font Size"
          items={fontSizes}
          onSelectItem={setFontSize}
          selectedItem={fontSize}
        />
      </li>

      <Modal icon="fa fa-archive"><AddPackage /></Modal>
      <Modal><FormSavePaste /></Modal>
      <li className="d-flex align-items-center list-group-item pr-0 pl-0"><Timer /></li>
      <li className="d-flex align-items-center list-group-item" onClick={onDownload}><i className="fa fa-download"></i></li>
    </ul>
  );
}