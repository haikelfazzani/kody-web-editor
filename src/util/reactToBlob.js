export default function reactToBlob (js) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  let jsURL = getBlobURL(js, 'text/javascript');

  const source = `
<!doctype html>
<html>
  <head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">  
  </head>
  <body>
    <div id="root"></div>

    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel" src="${jsURL}"></script>
  </body>
</html>`;

  return getBlobURL(source, 'text/html');
}