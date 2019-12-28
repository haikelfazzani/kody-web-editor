ace.require("ace/ext/language_tools");

const [editorHTML, editorCSS, editorJS] = [
  ace.edit("editor-html"),
  ace.edit("editor-css"),
  ace.edit("editor-js")
];
const editors = [editorHTML, editorCSS, editorJS];
const iframeElement = document.getElementById("code");
var editorConfig = {};

editorHTML.session.setMode("ace/mode/html")
editorCSS.session.setMode("ace/mode/css")
editorJS.session.setMode("ace/mode/javascript")

editors.forEach(e => {
  e.setTheme("ace/theme/monokai");
  e.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
  });
  e.session.setUseWrapMode(true);
})

/** get saved editor config */
if (localStorage.getItem('editor-config')) {
  editorConfig = JSON.parse(localStorage.getItem('editor-config'))
}
else {
  editorConfig = {
    defaultFontSize: 18,
    liveCode: false,
    codeSave: {
      html: '<p id="para">just text</p>',
      css: 'p { color: blue; }',
      js: `
window.onload = () => {
  const para = document.getElementById('para');
  para.addEventListener('click', () => {
    para.textContent = "hello world";
  });
};`
    }
  };
}

// default values for editors
editorHTML.setValue(editorConfig.codeSave.html || '<p id="para">just text</p>');
editorCSS.setValue(editorConfig.codeSave.css || 'p { color: blue; }');
editorJS.setValue(editorConfig.codeSave.js || '// js code');

iframeElement.src = getGeneratedPageURL(editorConfig.codeSave);

// live mode
const checkLiveCode = document.getElementById('livecode');
checkLiveCode.checked = editorConfig.liveCode;

// editors.forEach(e => {
//   e.session.on('change', function (delta) {
//     iframeElement.src = getGeneratedPageURL({
//       html: editorHTML.getValue(),
//       css: editorCSS.getValue(),
//       js: editorJS.getValue()
//     });
//   });
// })


/** btn run in nav : run code */
document.getElementById('btn-run').addEventListener('click', () => {
  iframeElement.src = getGeneratedPageURL({
    html: editorHTML.getValue(),
    css: editorCSS.getValue(),
    js: editorJS.getValue()
  });
}, false)
