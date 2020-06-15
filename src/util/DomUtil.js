const typescriptUrl = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/3.9.5/typescript.min.js';

export default class DomUtil {

  static appendScript (url = typescriptUrl, elementId = 'typescript') {
    this.removeElement(elementId);
    let script = document.createElement('script');
    script.id = elementId;
    script.src = url;
    document.body.appendChild(script);
  }

  static removeElement (id = 'typescript') {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }
}