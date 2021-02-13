/**
 * 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.min.js'
 * window.Sass.compile(css, function (result) { });
 */

import Compiler from "./Compiler";

export class IframeUtil {
  constructor (preprocessors) {
    this.jsPreprocessor = preprocessors.js; // typescript - javascript - babel - coffeescript etc...
    this.cssPreprocessor = preprocessors.css;
    this.htmlPreprocessor = preprocessors.html;

    this.iframe = document.createElement('iframe');
    this.iframe.id = 'sandbox';

    this.removeElement('sandbox');
    document.querySelector('.iframe-sandbox').appendChild(this.iframe);

    this.iframeDoc = this.iframe.contentDocument;
    this.iframeWin = this.iframe.contentWindow;
  }

  async write (html, cssValue, jsValue, resolve) {
    try {
      cssValue = await Compiler.toCss(this.cssPreprocessor, cssValue);
      jsValue = await Compiler.toJs(this.jsPreprocessor, jsValue);

      jsValue = (this.jsPreprocessor !== 'coffeescript')
        ? `<script type="module" defer>${jsValue}</script>`
        : `<script src="https://cdn.jsdelivr.net/npm/coffeescript@2.5.1/lib/coffeescript-browser-compiler-legacy/coffeescript.min.js"></script>
        <script type="text/${this.jsPreprocessor}" defer>${jsValue}</script>`;
        
      this.iframeDoc.open();
      this.iframeDoc.write(`<html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kody - Online web editor</title>
        <style>${cssValue}</style>              
      </head>
      <body>${html}${jsValue}</body>
    </html>`);
      this.iframeDoc.close();
    } catch (error) {
      resolve(error.message);
    }
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
