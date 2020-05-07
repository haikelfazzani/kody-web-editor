import { action } from 'easy-peasy';

let localW = window.localStorage ? localStorage.getItem('kody-webeditor-config') : null;

let model = localW ? JSON.parse(localW) : {
  libraries: [], // jquery, react, vue etc..
  embedIframe: '',
  generatedURL: '', // an url generated to be sahred
  isSassEnabled: false
}

const webeditor = {
  model,

  addLibrary: action((state, library) => {
    if (!state.model.libraries.includes(library) && library.length > 25) {
      state.model.libraries.push(library);
      localStorage.setItem('kody-webeditor-config', JSON.stringify(state.model));
    }
  }),

  onRemoveLibrary: action((state, library) => {
    if (state.model.libraries.includes(library)) {
      state.model.libraries = state.model.libraries.filter(lib => lib !== library);
      localStorage.setItem('kody-webeditor-config', JSON.stringify(state.model));
    }
  }),

  enableSass: action((state, isSassEnabled) => {
    state.model.isSassEnabled = isSassEnabled;
  })
}

export default webeditor;