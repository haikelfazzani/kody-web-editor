const typescriptUrl = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.0.5/typescript.min.js';

export default class DomUtil {

  static appendScript (url = typescriptUrl, elementId = 'typescript') {
    this.removeElement(elementId);
    let script = document.createElement('script');
    script.id = elementId;
    script.src = url;
    // insert before root div element
    const rootEl = document.getElementById('root');
    rootEl.parentNode.insertBefore(script, rootEl.previousElementSibling)
  }

  static removeElement (id = 'typescript') {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }
}