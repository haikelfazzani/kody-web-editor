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
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>    
    <script src="${jsURL}" defer></script>
  </body>
</html>`;

  return getBlobURL(source, 'text/html');
}