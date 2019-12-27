const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')

  const source = `
    <html>
      <head>
      <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `

  return getBlobURL(source, 'text/html')
}

const url = getGeneratedPageURL({
  html: '<p id="log">Hello, world!</p>',
  css: 'p { color: blue; }',
  js: `window.onload = () => {
    (function () {
      if (!console) {
          console = {};
      }
      var old = console.log;
      var logger = document.getElementById('log');
      console.log = function (message) {
          if (typeof message == 'object') {
              logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
          } else {
              logger.innerHTML += message + '<br />';
          }
      }
  })();
  console.log('sdgtest');
  console.log('test');
  }`
});

const iframe = document.querySelector('#iframe');
iframe.src = url;