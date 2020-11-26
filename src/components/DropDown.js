import React, { useRef } from 'react';
import useClickAway from '../hooks/useClickAway';

export default function DropDown ({ items, selectedItem, onSelectItem, dispText = true }) {

  const dropRef = useRef();
  const { isHide, setIsHide } = useClickAway(dropRef);

  return (<div className="dropdown">
    <div className="btn dropdown-toggle text-white" onClick={() => { setIsHide(!isHide); }}>
      {dispText && selectedItem}
    </div>
    <div ref={dropRef} className="dropdown-menu" style={{ display: isHide ? 'block' : 'none' }}>
      {items.map(i => <div
        className={"dropdown-item " + (selectedItem === i ? 'bg-success' : '')}
        key={i}
        onClick={() => { onSelectItem(i); }}>{i}</div>)}
    </div>
  </div>);
}