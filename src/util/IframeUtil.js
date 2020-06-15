/**
 * 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.min.js'
 * window.Sass.compile(css, function (result) { });
 */

export class IframeUtil {

  constructor (typeAsset) {
    this.typeJs = /react/g.test(typeAsset)
      ? "text/babel"
      : "text/javascript";

    this.typeLang = typeAsset; // typescript - javascript - react - vue etc...

    this.iframe = document.createElement('iframe');
    this.iframe.id = 'sandbox';

    this.removeElement('sandbox');
    document.querySelector('.iframe-sandbox').appendChild(this.iframe);

    this.iframeDoc = this.iframe.contentDocument;
    this.iframeWin = this.iframe.contentWindow;
  }

  write (html, cssValue, jsValue) {
    if (this.typeLang === 'typescript') {
      jsValue = this.compileTypescript(jsValue);
    }

    this.iframeDoc.open();
    this.iframeDoc.write(`<html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kody - Online web editor</title>
        <style>${cssValue}</style>              
      </head>
      <body>         
        ${html}     
        
        <script type="${this.typeJs}" defer>${jsValue}</script>
      </body>
    </html>`);
    this.iframeDoc.close();
  }

  compileTypescript (jsValue) {
    let resultCompiler = window.ts.transpileModule(jsValue, {
      compilerOptions: {
        allowJs: true,
        declaration: true,
        emitDeclarationOnly: true,
        noEmitOnError: true,
        noImplicitAny: true,
        target: window.ts.ScriptTarget.ES5,
        module: window.ts.ModuleKind.CommonJS
      }
    });

    return resultCompiler.outputText;
  }

  removeElement (id) {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }

  formatOutput (logMessages) {
    return logMessages.map(msg => this.concatArgs(msg)).join('\n');
  }

  concatArgs (logMessages) {
    let splitArgs = false;
    return logMessages.map(msg => {

      if (msg) {
        if (msg.toString() === '[object Map]' || msg.toString() === '[object Set]') {
          let arr = [...msg];
          msg = msg.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2);
          splitArgs = true;
        }
        if (msg.toString() === '[object Object]') {
          msg = msg.toString() + ' ' + JSON.stringify(msg, null, 2);
        }
        if (Array.isArray(msg)) {
          msg = `Array (${msg.length}) ` + JSON.stringify(msg, null, 2);
          splitArgs = true;
        }
      }

      return (msg === undefined) ? 'undefined' : msg;
    })
      .join(splitArgs ? '\n' : ' ');
  }
}
