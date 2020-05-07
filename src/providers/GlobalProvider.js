import { createStore } from 'easy-peasy';
import editorSettings from './editorSettings';
import webeditor from './webeditor';

const storeModel = {
  editorSettings,
  webeditor
};

const store = createStore(storeModel);
export default store;