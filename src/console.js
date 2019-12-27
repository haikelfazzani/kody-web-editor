document.getElementById('btn-console').addEventListener('click', () => {
  const ifCons = document.querySelector('.console-wrapper');
  ifCons.style.display = ifCons.style.display === 'block' ? 'none' : 'block';
})

document.getElementById('close-console').addEventListener('click', () => {
  const ifCons = document.querySelector('.console-wrapper');
  ifCons.style.display = ifCons.style.display === 'block' ? 'none' : 'block';
})

document.getElementById('btn-run').addEventListener('click', () => {

  const url = getGeneratedPageURL({
    html: '<ul id="log"></ul>',
    css: `
  ul {background-color: #272822 !important; list-style:none; padding:0; margin:0; }
  li { 
    padding: 10px 20px;
    color: #fff;
    border-bottom: 2px solid #2f3129;
  }
  `,
    js: `window.onload = () => {
    (function () {
      if (!console) {
        console = {};
      }
      var old = console.log;
      var logger = document.getElementById('log');
      console.log = function (message) {
        if (typeof message == 'object') {
          logger.innerHTML += '<li>' + (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '</li>';
        } else {
          logger.innerHTML += '<li>' + message + '</li>';
        }
      }
  })();
  ${editorConfig.codeSave.js}
  }`
  });

  const iframeConsole = document.querySelector('#iframe-console');
  iframeConsole.src = url;

})