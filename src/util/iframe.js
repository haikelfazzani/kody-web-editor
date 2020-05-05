export default function writeContent (html, css, js, libraries = []) {
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

      ${libraries.map(library => `<script type="text/javascript" src="${library}"></script>`)}

      <style>${css}</style>

      ${html}
      
      <script type="text/javascript" defer>${js}</script>
    </body>
  </html>`
};