export default function writeContent (html, css, js) {
  return `<html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reacto - Online web editor</title>
      <style>
        body {
          color: #fff;
        }        
      </style>
    </head>
    <body>      

      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <style>${css}</style>

      ${html}
      
      <script type="text/babel" defer>${js}</script>
    </body>
  </html>`
};