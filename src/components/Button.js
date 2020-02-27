import React from 'react'

function Button ({ onClick, text, clx }) { 
  return <button onClick={onClick} className={clx}>{text}</button>
}

export default React.memo(Button);
