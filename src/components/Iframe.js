import React from 'react';

function Iframe ({ title, src, id }) {
  return <iframe title={title} src={src} id={id}></iframe>;
}

export default React.memo(Iframe);