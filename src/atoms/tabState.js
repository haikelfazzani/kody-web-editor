import { atom } from "recoil";
import unquer from "unquer";
import Preprocessor from "../util/Preprocessor";

const { languages } = unquer.parse(window.location.search);

const initState = {
  languages: { html: languages[0] || 'html', css: languages[1] || 'css', javascript: languages[2] || 'javascript' },
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