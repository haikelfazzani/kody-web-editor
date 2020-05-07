import { action } from 'easy-peasy';

const frameworksCDN = {
  react: [
    'https://unpkg.com/react@16/umd/react.production.min.js',
    'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
  ],
  vue: ['https://cdn.jsdelivr.net/npm/vue/dist/vue.js'],
  jquery: ['https://code.jquery.com/jquery-3.5.1.min.js'],
  javascript: []
}

let localW = window.localStorage ? localStorage.getItem('kody-webeditor-config') : null;

let model = localW ? JSON.parse(localW) : {
  libraries: [], // jquery, react, vue etc..
  isSassEnabled: false,
  selectedFramework: 'javascript',
}

const webeditor = {
  model,

  chooseFramework: action((state, frameworkName) => {

    let getCDNs = frameworksCDN[frameworkName];

    state.model.libraries = getCDNs;
    state.model.selectedFramework = frameworkName;

    localStorage.setItem('kody-webeditor-config', JSON.stringify(state.model));
  }),

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