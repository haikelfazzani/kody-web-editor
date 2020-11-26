const prepos = {
  typescript: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.0.5/typescript.min.js',
  babel: 'https://unpkg.com/@babel/standalone/babel.min.js',
  less: 'https://cdn.jsdelivr.net/npm/less@3.12.2/dist/less.min.js',
  sass: 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.js'
};

export default class DomUtil {

  static appendScript (elementId = 'typescript') {
    let url = prepos[elementId];
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

  static removeElement (elementId = 'typescript') {
    if (prepos[elementId]) {
      let elem = document.getElementById(elementId);
      return elem ? elem.parentNode.removeChild(elem) : null;
    }
  }
}