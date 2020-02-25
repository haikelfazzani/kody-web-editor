export default function htmlToBlob (html, css, js) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  let cssURL = getBlobURL(css, 'text/css');
  let jsURL = getBlobURL(js, 'text/javascript');

  const source = `
<!doctype html>
<html>
  <head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
  <link rel="stylesheet" type="text/css" href="${cssURL}" />  
  </head>
  <body>
    ${html}   
    <script src="${jsURL}"></script>
  </body>
</html>`;

  return getBlobURL(source, 'text/html');
}