import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'];

function SelectFont () {

  const { state, setState } = useContext(GlobalContext);

  return (
    <select
      className="nav-link pr-1 pl-1"
      name="font-sizes"

      onChange={(e) => { setState({ ...state, fontSize: e.target.value }); }}
      value={state.fontSize}

      data-toggle="tooltip"
      data-placement="top"
      title="Font Size">

      {fontSizes.map(f => <option value={f} key={f}>{f}</option>)}
    </select>
  );
}

export default React.memo(SelectFont);