import React from 'react'

function LiveConsole({ playgroundState, dispatch }) {
  const onShowConsole = () => {
    dispatch({ type: 'show-console' });
  }

  return <div className="h-100 w-100" style={{ display: playgroundState.showConsole ? 'block' : 'none' }}>
    <div className="w-100 bg-dark d-flex justify-between align-center text-uppercase pr-1 pl-1 pb-1">
      <span><i className="fa fa-terminal mr-1"></i>console</span>
      <button onClick={onShowConsole} className="white"><i className="fa fa-times-circle"></i></button>
    </div>

    <pre>{playgroundState.logs}</pre>
  </div>
}

export default React.memo(LiveConsole)