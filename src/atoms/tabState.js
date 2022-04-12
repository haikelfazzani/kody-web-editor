import { atom } from "recoil";
import unquer from "unquer";
import Preprocessor from "../util/Preprocessor";

const params = unquer.parse(window.location.search);
let languages = { html: 'html', css: 'css', javascript: 'javascript' };

if (params.languages && params.languages.length > 1) {
  languages.html = params.languages[0];
  languages.css = params.languages[1];
  languages.javascript = params.languages[2];
}

const initState = {
  languages,
  tabIndex: 0,
}

const tabState = atom({
  key: 'Tab',
  default: initState
});

Object.values(initState.languages).forEach(lang => {
  Preprocessor.loadCDN(lang);
});

export default tabState;