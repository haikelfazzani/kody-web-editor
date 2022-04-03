import React from 'react'

function LiveIframe() {
  return <div className="h-100 iframe-sandbox">
    <iframe title="Kody online web editor" id="sandbox"></iframe>
  </div>
}

export default React.memo(LiveIframe)
