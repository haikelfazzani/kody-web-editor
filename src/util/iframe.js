export default function writeContent (html, css, js, libraries = [], sass = false) {

  return new Promise(async (resolve, reject) => {

    let content = '';

    if (sass) {
      let script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.min.js';

      document.body.insertBefore(script, document.body.firstChild);

      if (window.Sass) {
        window.Sass.compile(css, function (result) {
          content = getContent(result.text, html, js, libraries);
          resolve(content);
        });
      }
    }
    else {
      content = getContent(css, html, js, libraries);
      resolve(content);
    }

    await handleConsole();
  });
};

function getContent (cssValue, html, jsValue, libraries) {

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
    <title>Kody - Online web editor</title>

    ${cssLinks}

    <style>
      body {
        color: #fff;
      }        
      ${cssValue}
    </style>
    
  </head>
  <body>   
  
    <!--<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>-->
    ${jsLinks}

    ${html}
    
    <script type="text/javascript" defer>${jsValue}</script>
  </body>
</html>`
}

function handleConsole () {

  return new Promise((resolve, reject) => {
    let iframe = document.getElementById('kody-iframe');
    let iframeErrors = false;
    
    // handle errors
    iframe.contentWindow.onerror = (message, file, line, col, error) => {
      iframeErrors = true;
      iframe.contentWindow.parent.postMessage(`(${line}:${col}) -> ${error}`);
      reject(iframeErrors);
    };

    // get console outputs as string
    handleConsoleOutput(iframe, result => {
      iframeErrors = false;
      iframe.contentWindow.parent.postMessage(result);
      resolve(iframeErrors);
    });

  });
}


function handleConsoleOutput (iframe, resolve) {
  let logMessages = [];

  iframe.contentWindow.console.log = function () {
    logMessages.push.apply(logMessages, arguments);

    let b = logMessages.map(v => {
      if (v.toString() === '[object Map]' || v.toString() === '[object Set]') {
        let arr = [...v];
        v = v.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2);
      }
      if (v.toString() === '[object Object]') {
        v = v.toString() + ' ' + JSON.stringify(v, null, 2);
      }
      if (Array.isArray(v)) {
        v = `Array (${v.length}) ` + JSON.stringify(v, null, 2);
      }
      return v
    });

    resolve(b.join('\n'));
  };
}