import templates from '../util/templates';
import loadTheme from "../util/loadTheme";
import Preprocessor from '../util/Preprocessor';

const initState = localStorage.getItem('config-v2')
  ? JSON.parse(localStorage.getItem('config-v2'))
  : {
    tabs: templates['vanilla'],
    languages: { html: 'html', css: 'css', javascript: 'javascript' },
    template: 'vanilla',
    tabIndex: 0,
    showConsole: true,
    logs: '',
    editorOptions: {
      keyboardHandler: 'ace/keyboard/sublime',
      theme: 'monokai',
      fontSize: 16,
      tabSize: 2,
      showInvisibles: false,
      enableLiveAutocompletion: false,
      wrapEnabled: false
    }
  };

initState.template = 'local';

loadTheme(initState.editorOptions.theme);
document.documentElement.setAttribute('data-theme', initState.editorOptions.theme);

Object.values(initState.languages).forEach(lang => {
  Preprocessor.loadCDN(lang);
});

export default initState