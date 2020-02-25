import React from 'react'

export default function Button ({ onClick, text, clx }) { 
  return <button onClick={onClick} className={clx}>{text}</button>
}
