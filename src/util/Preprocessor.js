const cdns = {
  typescript: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.6.3/typescript.min.js',
  babel: 'https://unpkg.com/@babel/standalone@7.17.0/babel.min.js',
  less: 'https://cdn.jsdelivr.net/npm/less@4.1.2/dist/less.min.js',
  sass: 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.js'
};

export default class Preprocessor {
  static appendToDOM(elementId) {
    let url = cdns[elementId];
    if (url) {
      this.removeElement(elementId);

      let script = document.createElement('script');
      script.type = "text/javascript";
      script.id = elementId;
      script.src = url;
      // insert before root div element
      const rootEl = document.getElementById('root');
      rootEl.parentNode.insertBefore(script, rootEl.previousElementSibling);
    }
  }

  static loadScript (elementId = 'typescript') {    
    if(elementId === 'babel+typescript') {
      this.appendToDOM('typescript')
      this.appendToDOM('babel')
    }
    else {
      this.appendToDOM(elementId)
    }
  }

  static removeElement (elementId = 'typescript') {
    if (cdns[elementId]) {
      let elem = document.getElementById(elementId);
      return elem ? elem.parentNode.removeChild(elem) : null;
    }
  }
}