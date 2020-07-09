import emptytTemplate from './templates/emptytTemplate';
import reactTemplate from './templates/reactTemplate';
import vueTemplate from './templates/vueTemplate';
import preactTemplate from './templates/preactTemplate';
import rxjsTemplate from './templates/rxjsTemplate';
import typescriptTemplate from './templates/typescriptTemplate';
import jqueryTemplate from './templates/jqueryTemplate';

// let localTabs = localStorage.getItem('kody-tabs');
// localTabs = localTabs ? JSON.parse(localTabs) : emptytTemplate;

const templates = {
  default: emptytTemplate,
  react: reactTemplate,
  vue: vueTemplate,
  preact: preactTemplate,
  rxjs: rxjsTemplate,
  typescript: typescriptTemplate,
  jquery: jqueryTemplate,
}

export default templates;