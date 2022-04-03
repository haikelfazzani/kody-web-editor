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
    theme: 'monokai',
    fontSize: 16
  };

initState.template = 'local';

loadTheme(initState.theme);
document.documentElement.setAttribute('data-theme', initState.theme);

Object.values(initState.languages).forEach(lang => {
  Preprocessor.loadCDN(lang);
});

export default initState