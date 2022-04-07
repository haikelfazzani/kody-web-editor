import templates from '../util/templates/index';
import loadTheme from "../util/loadTheme";
import Preprocessor from '../util/Preprocessor';

const initState = localStorage.getItem('config')
  ? JSON.parse(localStorage.getItem('config'))
  : {
    tabs: templates['vanilla'],
    languages: { html: 'html', css: 'css', javascript: 'javascript' },
    template: 'vanilla',
    tabIndex: 0,
    showConsole: true,
    logs: '',
    editorOptions: {
      theme: 'monokai',
      fontSize: 16,
      tabSize: 2
    }
  };

initState.template = 'local';

loadTheme(initState.editorOptions.theme);
document.documentElement.setAttribute('data-theme', initState.editorOptions.theme);

Object.values(initState.languages).forEach(lang => {
  Preprocessor.loadCDN(lang);
});

export default initState