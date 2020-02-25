export function downloadAsHTML (html,css,js) {

  const codeToDownload = `
  <!doctype html>
  <html>
    <head>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
      <style>${css || ''}</style>
    </head>
    <body>
      ${html || ''}
      <script src="${js || ''}"></script>
    </body>
  </html>`;

  const linkEl = document.createElement('a');
  linkEl.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(codeToDownload));
  linkEl.setAttribute('download', 'kody.html');

  linkEl.style.display = 'none';
  document.body.appendChild(linkEl);

  linkEl.click();

  document.body.removeChild(linkEl);
}

export function downloadAsJsx (jsx) {

  const linkEl = document.createElement('a');
  linkEl.setAttribute('href', 'data:text/javascript;charset=utf-8,' + encodeURIComponent(jsx));
  linkEl.setAttribute('download', 'kody');

  linkEl.style.display = 'none';
  document.body.appendChild(linkEl);

  linkEl.click();

  document.body.removeChild(linkEl);
}

