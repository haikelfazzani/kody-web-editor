import { createStore, action, thunk } from 'easy-peasy';
import { IframeUtil } from '../util/IframeUtil';
import cdnjs from '../util/cdnjs';
import DomUtil from '../util/DomUtil';

let template = localStorage.getItem('kody-template') || 'vanilla';
let resources = [];
let preprocessors = { html: 'html', css: 'css', js: 'javascript' };

try {
  resources = localStorage.getItem('kody-resources');
  resources = resources ? JSON.parse(resources) : cdnjs[template];

  let lPreps = localStorage.getItem('kody-preprocessors');
  preprocessors = lPreps ? JSON.parse(lPreps) : preprocessors;

  DomUtil.appendScript(preprocessors.js);
} catch (error) {
}

const editorModel = {
  editorValue: '<div>hello</div>',
  consoleLogs: '// console',
  template,
  fontSize: localStorage.getItem('kody-fontSize') || 16,
  preprocessors,
  resources, // packages as cdn: react...

  setEditorValue: action((state, payload) => {
    state.editorValue = payload;
  }),

  setPreprocessors: action((state, preprocessors) => {
    state.preprocessors = preprocessors;
    localStorage.setItem('kody-preprocessors', JSON.stringify(preprocessors));
  }),

  setResources: action((state, resources) => { // template : vuejs, react...   
    state.resources = resources;
    localStorage.setItem('kody-resources', JSON.stringify(resources));
  }),

  setTemplate: action((state, template) => { // template : vuejs, react...    
    state.template = template;
    state.resources = cdnjs[template];
    if (template === 'react' || template === 'preact') {
      state.preprocessors = { ...state.preprocessors, js: 'babel' };
    }
    localStorage.setItem('kody-template', template);
    localStorage.setItem('kody-resources', JSON.stringify(cdnjs[template]));
  }),

  setFontSize: action((state, fontSize) => {
    state.fontSize = fontSize;
    localStorage.setItem('kody-fontSize', fontSize);
  }),

  setConsoleLogs: action((state, consoleLogs) => {
    state.consoleLogs = consoleLogs;
  }),

  runCode: thunk(async (actions, { tabs, preprocessors, resources }) => {

    let iframeUtil = new IframeUtil(preprocessors, resources);

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