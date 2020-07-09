import { createStore, action } from 'easy-peasy';
import { IframeUtil } from '../util/IframeUtil';

const editorModel = {
  editorValue: '<div>hello</div>',
  consoleLogs: '// console',
  template: localStorage.getItem('kody-template') || 'default',
  fontSize: localStorage.getItem('kody-fontSize') || 16,

  setEditorValue: action((state, payload) => {
    state.editorValue = payload;
  }),

  setTemplate: action((state, template) => { // template : vuejs, react...    
    state.template = template;
    localStorage.setItem('kody-template', template);
  }),

  setFontSize: action((state, fontSize) => {    
    state.fontSize = fontSize;
    localStorage.setItem('kody-fontSize', fontSize);
  }),

  runCode: action((state, { template, tabs }) => {
    let iframeUtil = new IframeUtil(template);

    let messages = [];
    iframeUtil.iframeWin.console.log = (...args) => {
      messages.push.apply(messages, [args]);
      state.consoleLogs = iframeUtil.formatOutput(messages);
    };

    iframeUtil.write(...tabs);
  })
};


const storeModel = {
  editorModel
};


const playgroundStore = createStore(storeModel);

export default playgroundStore;