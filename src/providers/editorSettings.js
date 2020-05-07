import { action } from 'easy-peasy';

let localS = window.localStorage ? localStorage.getItem('kody-config') : null;

const editorSettings = {
  model: localS ? JSON.parse(localS) : { fontSize: '16px' },
  updateFontSize: action((state, fontSize) => {
    state.model.fontSize = fontSize;
    localStorage.setItem('kody-config', JSON.stringify(state.model));
  })
};

export default editorSettings;