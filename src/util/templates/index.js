import vanillaTemplate from './vanillaTemplate';
import reactTemplate from './reactTemplate';
import vueTemplate from './vueTemplate';
import preactTemplate from './preactTemplate';
import rxjsTemplate from './rxjsTemplate';
import jqueryTemplate from './jqueryTemplate';
import lodashTemplate from './lodashTemplate';
import nanojsxTemplate from './nanojsxTemplate';

const templates = {
  local: localStorage.getItem('tabs') ? JSON.parse(localStorage.getItem('tabs')) : vanillaTemplate,
  vanilla: vanillaTemplate,
  nanojsx: nanojsxTemplate,
  react: reactTemplate,
  vue: vueTemplate,
  preact: preactTemplate,
  rxjs: rxjsTemplate,
  jquery: jqueryTemplate,
  lodash: lodashTemplate,
}

export default templates;
