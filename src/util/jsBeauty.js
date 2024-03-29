const jsBeautyOptions = {
  'indent_size': 2,
  'jslint_happy': false,
  'e4x': true,
  'brace_style': 'preserve-inline',
  'break_chained_methods': false,
  'detect_packers': true
};

export default function jsBeauty (data, lang) {
  switch (lang) {
    case 'javascript':
      return window.js_beautify(data, jsBeautyOptions);

    case 'css':
      return window.css_beautify(data, jsBeautyOptions);

    case 'html':
      return window.html_beautify(data, jsBeautyOptions);

    default:
      return data;
  }
}