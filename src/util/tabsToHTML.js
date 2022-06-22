export default function tabsToHTML() {
  const tabs = JSON.parse(localStorage.getItem('tabs'));  
  return `<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kody - Online web editor</title>
    <style>${tabs[1]}</style>              
  </head>
  <body>
    ${tabs[0]}
    <script>${tabs[2]}</script>
  </body>
</html>`
}