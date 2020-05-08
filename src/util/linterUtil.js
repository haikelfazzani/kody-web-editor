import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import jshint from './jshint';

export default async function linterUtil (tabId, jsValue, cssVal) {

  return new Promise((resolve, reject) => {

    if (tabId === 2) {
      // Postcss
      const params = { overrideBrowserslist: 'last 4 version', grid: "autoplace" };

      postcss([autoprefixer(params)])
        .process(cssVal).then(compiled => {
          resolve(compiled.css);
        })
        .catch(error => { });
    }

    if (tabId === 1) {
      // babel transpiler
      try {
        let output = window.Babel.transform(jsValue, {
          envName: 'production',
          presets: ['react', 'es2015']
        }).code;

        resolve(output);
      } catch (error) {
        reject(error.message);
      }
    }

    if (tabId === 0) {
      // JShint errors
      if (jsValue) {
        let res = jshint(jsValue);
        resolve(res);
      }
    }
  });

}