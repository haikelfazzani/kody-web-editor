export default function writeContent (html, css, js, libraries = []) {

  let scripts = '';
  libraries.forEach(lib => {
    scripts += "<script src=" + lib + "></script>";
  });

  return `<html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reacto - Online web editor</title>
      <style>
        body {
          color: #fff;
        }        
        ${css}
      </style>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      ${scripts}
    </head>
    <body>                  

      ${html}
      
      <script type="text/babel" defer>${js}</script>
    </body>
  </html>`
};