import { createStore, action } from 'easy-peasy';

const editorSettingsActions = {
  updateFontSize: action((state, fontSize) => {
    return { ...state, editorSettings: { ...state.editorSettings, fontSize } }
  })
};


let local = window.localStorage ? localStorage.getItem('reacto-config') : null;

const storeModel = {
  editorSettings: local ? JSON.parse(local) : { fontSize: '16px' },
  webeditor: {
    addedLibraries: [], // jquery, react, vue
    embedIframe: '',
    generatedURL: '' // an url generated to be sahred
  },
  ...editorSettingsActions
};

const store = createStore(storeModel);

export default store;