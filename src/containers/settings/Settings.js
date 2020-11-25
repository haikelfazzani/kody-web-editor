import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import DropDown from '../../components/DropDown';
import templates from '../../util/templates';
import Timer from './Timer';
import FormSavePaste from './FormSavePaste';
import Modal from '../../components/Modal';
import download from '../../util/download';
import tabsToString from '../../util/tabsToString';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

export default function Settings () {

  const { resources, template, fontSize } = useStoreState(state => state.editorModel);
  const { setTemplate, setFontSize } = useStoreActions(actions => actions.editorModel);

  const onDownload = () => {
    let code = tabsToString(resources, template);
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

      <li className="d-flex align-items-center list-group-item pr-0 pl-0"><Timer /></li>

      <li className="d-flex align-items-center list-group-item" onClick={onDownload}><i className="fa fa-download"></i></li>

      <Modal><FormSavePaste /></Modal>
    </ul>
  );
}