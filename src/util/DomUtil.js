const prepos = {
  javascript: '',
  typescript: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.0.5/typescript.min.js',
  coffeescript: '',
  babel: 'https://unpkg.com/@babel/standalone/babel.min.js'
};

export default class DomUtil {

  static appendScript (elementId = 'typescript') {
    if (elementId !== 'coffeescript' && elementId !== 'javascript') {
      this.removeElement(elementId);
      let url = prepos[elementId];
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
    if (elementId !== 'coffeescript' && elementId !== 'javascript') {
      let elem = document.getElementById(elementId);
      return elem ? elem.parentNode.removeChild(elem) : null;
    }
  }
}