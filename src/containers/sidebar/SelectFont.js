import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'];

function SelectFont () {

  const fontSize = useStoreState(state => state.editorSettings.model.fontSize);
  const updateFontSize = useStoreActions(actions => actions.editorSettings.updateFontSize);

  useEffect(() => {
    document.querySelector('.CodeMirror').style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <select
      className="nav-link pr-1 pl-1"
      name="font-sizes"

      onChange={(e) => { updateFontSize(e.target.value); }}
      value={fontSize}

      data-toggle="tooltip"
      data-placement="top"
      title="Font Size">

      {fontSizes.map(f => <option value={f} key={f}>{f}</option>)}
    </select>
  );
}

export default React.memo(SelectFont);