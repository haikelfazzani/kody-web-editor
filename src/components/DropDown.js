import React, { useState } from 'react';

export default function DropDown ({ items, selectedItem, onSelectItem }) {

  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  }

  return (<div className="dropdown">
    <div className="w-100 list-group-item border-0 dropdown-toggle" type="button" onClick={onToggle}>
      {selectedItem}
    </div>
    <div className="dropdown-menu" style={{ display: toggle ? 'block' : 'none' }}>
      {items.map(i => <div
        className={"dropdown-item " + (selectedItem === i ? 'bg-success' : '')}
        key={i}
        onClick={() => { onSelectItem(i); onToggle() }}>{i}</div>)}
    </div>
  </div>);
}