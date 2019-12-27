function downloadAsFile (filename, code) {

  const codeToDownload = `
  <!doctype html>
  <html>
    <head>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
      <style>${code.css || ''}</style>
    </head>
    <body>
      ${code.html || ''}
      <script src="${code.js || ''}"></script>
    </body>
  </html>`;

  const linkEl = document.createElement('a');
  linkEl.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(codeToDownload));
  linkEl.setAttribute('download', filename);

  linkEl.style.display = 'none';
  document.body.appendChild(linkEl);

  linkEl.click();

  document.body.removeChild(linkEl);
}

function changeFontSize (element, newSize) {
  element.style.fontSize = newSize + 'px';
}

const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')

  const source = `
<!doctype html>
<html>
  <head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
    ${js && `<script src="${jsURL}"></script>`}
  </head>
  <body>
    ${html || ''}
  </body>
</html>`;

  return getBlobURL(source, 'text/html')
}