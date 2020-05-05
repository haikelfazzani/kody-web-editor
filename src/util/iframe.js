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
      ${css}</style>
    </head>
    <body>        
      ${html}
      <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
      <script type="text/javascript" defer>${js}</script>
    </body>
  </html>`
};