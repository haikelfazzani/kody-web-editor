import { createStore, action, thunk } from 'easy-peasy';
import { IframeUtil } from '../util/IframeUtil';
import cdnjs from '../util/cdnjs';

let template = localStorage.getItem('kody-template') || 'default';
let resources = [];
try {
  resources = localStorage.getItem('kody-resources');
  resources = resources ? JSON.parse(resources) : cdnjs[template];
} catch (error) {
  resources = [];
}

const editorModel = {
  editorValue: '<div>hello</div>',
  consoleLogs: '// console',
  template,
  fontSize: localStorage.getItem('kody-fontSize') || 16,
  resources, // packages as cdn: react...

  setEditorValue: action((state, payload) => {
    state.editorValue = payload;
  }),

  setResources: action((state, resources) => { // template : vuejs, react...   
    state.resources = resources;
    localStorage.setItem('kody-resources', JSON.stringify(resources));
  }),

  setTemplate: action((state, template) => { // template : vuejs, react...    
    state.template = template;
    state.resources = cdnjs[template];
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

  runCode: thunk(async (actions, { template, tabs, resources }) => {
    let iframeUtil = new IframeUtil(template, resources);

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