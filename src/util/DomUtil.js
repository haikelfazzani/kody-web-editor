import cdns from "./cdns";

export default class DomUtil {

  static appendScript (elementId = 'typescript') {
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

  static removeElement (elementId = 'typescript') {
    if (cdns[elementId]) {
      let elem = document.getElementById(elementId);
      return elem ? elem.parentNode.removeChild(elem) : null;
    }
  }
}