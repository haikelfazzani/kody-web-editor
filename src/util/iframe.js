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


  jsValue = window.Babel.transform(jsValue, {
    envName: 'production',
    presets: ['react', 'es2015']
  }).code;

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
  
    ${jsLinks}

    ${html}
    
    <script type="text/javascript" defer>${jsValue}</script>
  </body>
</html>`
}

function handleConsole () {

  return new Promise((resolve, reject) => {
    let iframe = document.getElementById('kody-iframe');
    // handle errors
    iframe.contentWindow.onerror = (message, file, line, col, error) => {
      iframe.contentWindow.parent.postMessage(`(${line}:${col}) -> ${error}`);
      reject(`(${line}:${col}) -> ${error}`);
    };

    // get console outputs as string
    handleConsoleOutput(iframe, result => {
      iframe.contentWindow.parent.postMessage(result);
      resolve(result);
    });
  });
}


function handleConsoleOutput (iframe, resolve) {
  let logMessages = [];

  const apply = ['log', 'error', 'dir', 'info', 'warn', 'assert', 'debug', 'clear'];

  apply.forEach(method => {
    iframe.contentWindow.console[method] = (...args) => {

      logMessages.push.apply(logMessages, args);

      let output = logMessages.map(msg => {

        if (msg && (msg.toString() === '[object Map]' || msg.toString() === '[object Set]')) {
          let arr = [...msg];
          msg = msg.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2);
        }

        if (msg && (msg.toString() === '[object Object]')) {
          msg = msg.toString() + ' ' + JSON.stringify(msg, null, 2);
        }

        if (msg && Array.isArray(msg)) {
          msg = `Array (${msg.length}) ` + JSON.stringify(msg, null, 2);
        }

        return msg === undefined ? 'undefined' : msg;
      });

      resolve(output.join('\n'));
    };
  });
}