import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import DropDown from '../DropDown';
import templates from '../../util/templates';
import Timer from './Timer';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

export default function Settings () {

  const { template, fontSize } = useStoreState(state => state.editorModel);
  const { setTemplate, setFontSize } = useStoreActions(actions => actions.editorModel);

  return (
    <div className="d-flex">
      <DropDown
        text="Template"
        items={Object.keys(templates)}
        onSelectItem={setTemplate}
        selectedItem={template}
      />

      <DropDown
        text="Font Size"
        items={fontSizes}
        onSelectItem={setFontSize}
        selectedItem={fontSize}
      />

      <Timer />
    </div>
  );
}