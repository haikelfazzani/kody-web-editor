function removeElement (id) {
  let elem = document.getElementById(id);
  return elem ? elem.parentNode.removeChild(elem) : null;
}

function createIframe () {
  removeElement('js-console-iframe');
  const iframe = document.createElement('iframe');
  iframe.id = 'js-console-iframe';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
}

function createScript (iframe, jsScript) {
  const doc = iframe.contentDocument;
  const script = doc.createElement('script');
  const blob = new Blob([jsScript], { type: 'application/javascript' });
  script.src = URL.createObjectURL(blob);
  doc.body.append(script);
}

export default function evalConsole (jsScript) {
  
  let iframeErrors = false;

  return new Promise((resolve, reject) => {

    const iframe = createIframe();
    createScript(iframe, jsScript);

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