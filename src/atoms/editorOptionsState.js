import { atom } from "recoil";
import loadTheme from '../util/loadTheme';

const local = localStorage.getItem('editor-options-v3');
const initState = local
  ? JSON.parse(local)
  : {
    keyboardHandler: 'ace/keyboard/sublime',
    theme: 'monokai',
    fontSize: 16,
    tabSize: 2,
    showInvisibles: false,
    enableLiveAutocompletion: true,
    wrapEnabled: false,
    useWorker: true
  }

const editorOptionsState = atom({
  key: 'EditorOptions',
  default: initState,
});

loadTheme(initState.theme);
document.documentElement.setAttribute('data-theme', initState.theme);

export default editorOptionsState;