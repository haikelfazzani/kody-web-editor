import { createStore, action } from 'easy-peasy';
import copyToClipboard from '../util/copyToClipboard';

let localS = window.localStorage ? localStorage.getItem('kody-config') : null;

const editorSettings = {
  model: localS ? JSON.parse(localS) : { fontSize: '16px' },
  updateFontSize: action((state, fontSize) => {
    state.model.fontSize = fontSize;
  })
};


let localW = window.localStorage ? localStorage.getItem('kody-webeditor-config') : null;

const webeditor = {
  model: localW ? JSON.parse(localW) : {
    libraries: [], // jquery, react, vue etc..
    embedIframe: '',
    generatedURL: '' // an url generated to be sahred
  },

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

  generateURL: action((state) => {
       
  }),

  embedIframeURL: action((state, library) => {
    let codeResult = localStorage.getItem('reacto-web-editor');

    if(codeResult) {      

      const encodedData = window.btoa(JSON.stringify(codeResult));
      let url = window.location.origin + '/web-editor?w=' + encodedData;
  
      url = `<iframe src="${url}" title="kody" width="500" height="500"></iframe>`;
  
      copyToClipboard(url);

      state.model.generatedURL = url;
      return state
    } 
  })
}


const storeModel = {
  editorSettings,
  webeditor
};

const store = createStore(storeModel);
export default store;