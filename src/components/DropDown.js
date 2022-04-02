import React, { useState, useRef } from 'react'
import useClickAway from '../hooks/useClickAway';

export default function Dropdown({ title, data, icon, color, onclick, clx }) {

  const dropRef = useRef()
  const { isHide, setIsHide } = useClickAway(dropRef);
  const [state, setState] = useState(Array.isArray(data) ? data[0] : data);

  return <li className={"dropdown position-relative mr-3 " + clx}>
    <div className='h-100 d-flex'>
      <span className='h-100 d-flex align-center mr-1' onClick={() => { onclick(state) }}>
        <i className={icon + ' ' + color}></i>{title}
      </span>
      <span className='h-100 d-flex align-center' onClick={() => { setIsHide(!isHide) }}><i className='fa fa-chevron-down'></i></span>
    </div>

    {isHide && <div className="bg-dark dropdown-menu" ref={dropRef}>
      {data.map((l, i) => <div
        className="dropdown-item cp"
        key={i}
        onClick={() => { setState(l); onclick(l); setIsHide(!isHide) }}>{l}</div>)}
    </div>}
  </li>
}