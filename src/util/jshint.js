export default function jshint (jsValue) {
  window.JSHINT(jsValue, {
    browser: true,
    asi: true,
    lastsemic: false,
    esnext: true,
    latedef: true,
    undef: true,
    predef: [ "console" ]
  });

  let res = window.JSHINT.errors.reduce((a, e) => {
    a += `line ${e.line}: ${e.reason} \n`;
    return a
  }, '');

  return res;
}