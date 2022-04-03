import React, { useRef, useCallback } from 'react'
import useClickAway from '../hooks/useClickAway';

export default function Dropdown({ title, data, icon, onchange, onTab, index }) {
  const dropRef = useRef()
  const { isHide, setIsHide } = useClickAway(dropRef);

  const onTabChange = useCallback(() => {
    if (onTab) onTab(index);
  }, [])

  return <div className="h-100 dropdown position-relative mr-3">
    <div className='h-100 d-flex'>
      <span className='h-100 d-flex align-center mr-1' onClick={onTabChange}>
        <i className={icon}></i><span>{title}</span>
      </span>
      <span className='h-100 d-flex align-center' onClick={() => { setIsHide(!isHide) }}>
        <i className='fa fa-chevron-down'></i>
      </span>
    </div>

    {isHide && <div className="bg-dark dropdown-menu" ref={dropRef}>
      {data.map((l, i) => <div
        className="dropdown-item cp"
        key={i}
        onClick={() => { onchange(l, index); setIsHide(!isHide) }}>{l}</div>)}
    </div>}
  </div>
}