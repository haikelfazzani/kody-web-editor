import { createStore, action, thunk } from 'easy-peasy';
import { IframeUtil } from '../util/IframeUtil';
import DomUtil from '../util/DomUtil';

let preprocessors = { html: 'html', css: 'css', js: 'javascript' };

try {
  let lPreps = localStorage.getItem('kody-preprocessors');
  preprocessors = lPreps ? JSON.parse(lPreps) : preprocessors;

  DomUtil.appendScript(preprocessors.js);
} catch (error) {
}

const editorModel = {
  editorValue: '<div>hello</div>',
  consoleLogs: '// console',
  template: 'vanilla',
  resources: [],
  fontSize: localStorage.getItem('kody-fontSize') || 16,
  preprocessors,

  setEditorValue: action((state, payload) => {
    state.editorValue = payload;
  }),

  setPreprocessors: action((state, preprocessors) => {
    state.preprocessors = preprocessors;
    //localStorage.setItem('kody-preprocessors', JSON.stringify(preprocessors));
  }),

  setResources: action((state, resources) => { // template : vuejs, react...   
    state.resources = resources;
  }),

  setTemplate: action((state, template) => { // template : vuejs, react...    
    state.template = template;
    if (template === 'react' || template === 'preact') {
      state.preprocessors = { ...state.preprocessors, js: 'babel' };
      DomUtil.appendScript('babel');
      localStorage.setItem('kody-preprocessors', JSON.stringify(state.preprocessors));
    }
  }),

  setFontSize: action((state, fontSize) => {
    state.fontSize = fontSize;
    localStorage.setItem('kody-fontSize', fontSize);
  }),

  setConsoleLogs: action((state, consoleLogs) => {
    state.consoleLogs = consoleLogs;
  }),

  runCode: thunk(async (actions, { tabs, preprocessors }) => {

    let iframeUtil = new IframeUtil(preprocessors);

    let messages = [];
    iframeUtil.iframeWin.console.log = (...args) => {
      messages.push.apply(messages, [args]);
      actions.setConsoleLogs(iframeUtil.formatOutput(messages));
    };

    iframeUtil.write(...tabs, err => {
      if (err) { actions.setConsoleLogs(err); }
    });
  })
};

const storeModel = {
  editorModel
};

const playgroundStore = createStore(storeModel);
export default playgroundStore;