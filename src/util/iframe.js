export default function writeContent (html, css, js, libraries = []) {

  let jsLinks = '';
  let cssLinks = '';

  libraries.forEach(lib => {
    let i = lib.lastIndexOf('.');
    let extension = lib.slice(i + 1);

    if (extension === 'css') {
      cssLinks += '<link rel="stylesheet" href="' + lib + '"></link>';
    }
    else {
      jsLinks += '<script src="' + lib + '"></script>';
    }
  });

  return `<html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reacto - Online web editor</title>

      ${cssLinks}

      <style>
        body {
          color: #fff;
        }        
        ${css}
      </style>
      
    </head>
    <body>   
    
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      ${jsLinks}

      ${html}
      
      <script type="text/babel" defer>${js}</script>
    </body>
  </html>`
};