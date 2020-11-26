export default class Compiler {
  static async toJs (jsPreprocessor, jsValue) {
    return new Promise((resolve, reject) => {
      if (jsPreprocessor === 'typescript') {
        let res = window.ts.transpileModule(jsValue, {
          compilerOptions: {
            allowJs: true,
            declaration: true,
            emitDeclarationOnly: true,
            noEmitOnError: true,
            noImplicitAny: true,
            target: window.ts.ScriptTarget.ES5,
            module: window.ts.ModuleKind.CommonJS
          }
        }).outputText;

        resolve(res);
      }

      if (jsPreprocessor === 'babel') {
        let options = { envName: 'production', presets: ['react', 'es2015'], babelrc: false };
        let res = window.Babel.transform(jsValue, options);
        resolve(res.code);
      }

      else { resolve(jsValue); }
    });
  }

  static async toCss (cssPreprocessor, cssValue) {
    return new Promise((resolve, reject) => {
      if (cssPreprocessor === 'less') {
        let options = { env: "production" };

        window.less.render(cssValue, options, (error, output) => {
          resolve(output.css);
          reject(error);
        });
      }
      if (cssPreprocessor === 'sass') {
        window.Sass.compile(cssValue, (result) => {
          resolve(result.text);
          if (result.formatted) {
            reject(result.formatted);
            window.postMessage(result.formatted, "*")
          }
        });
      }
      else {
        resolve(cssValue);
      }
    });
  }
}