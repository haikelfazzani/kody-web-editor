import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const frameworks = [
  { name: 'javascript', color: 'bg-warning' },
  { name: 'jquery', color: 'bg-primary' },
  { name: 'react', color: 'bg-info' },
  { name: 'vue', color: 'bg-success' }
];

export default function SelectFramework () {

  const selectedFramework = useStoreState(state => state.webeditor.model.selectedFramework);
  const chooseFramework = useStoreActions(actions => actions.webeditor.chooseFramework);

  const [isDropOpen, setIsDropOpen] = useState(false);

  const openDrop = () => { setIsDropOpen(!isDropOpen); }

  const onSelect = (f) => { chooseFramework(f.name); }


  return (
    <div className="dropdown ml-3">

      <button type="button" className="btn btn-primary pb-2" onClick={openDrop}>
        {selectedFramework}<i className={"ml-2 fas fa-caret-" + (isDropOpen ? "up" : "down")}></i>
      </button>

      <div className="dropdown-menu" style={{ display: isDropOpen ? 'block' : 'none' }}>

        {frameworks.map(f => <div
          value={f.name}
          key={'frame' + f.name}
          className={"dropdown-item " + (f.name === selectedFramework ? "dropdown-item-active" : "")}
          onClick={() => { onSelect(f) }}>
          {f.name}
        </div>)}
      </div>

    </div>
  );
}
