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

  const { preprocessors, template, fontSize, theme } = useStoreState(state => state.editorModel);
  const { setEditorValue, setTemplate, setFontSize, setTheme } = useStoreActions(actions => actions.editorModel);

  const onDownload = async () => {
    let code = await tabsToString(preprocessors);
    download(code, 'kody.html');
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
        setEditorValue(reader.result);
      };
    }
  }

  const onTheme = _ => {
    setTheme(theme === 'monokai' ? 'xcode' : 'monokai');
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

      <input type="file" name="desktop-file" id="desktop-file" onChange={onLoadFile} hidden />

      <Modal icon="fa fa-archive"><AddPackage /></Modal>
      <Modal><FormSavePaste /></Modal>
      <li className="d-flex align-items-center list-group-item pr-0 pl-0"><Timer /></li>
      <li className="d-flex align-items-center list-group-item" onClick={onLoadFromDesktop}><i className="fa fa-folder-open"></i></li>
      <li className="d-flex align-items-center list-group-item" onClick={onDownload}><i className="fa fa-download"></i></li>
      <li className="d-flex align-items-center list-group-item" onClick={onTheme} title="Change Theme"><i className="fa fa-sun"></i></li>
    </ul>
  );
}