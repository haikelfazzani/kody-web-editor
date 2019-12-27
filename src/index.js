var editorHTML = ace.edit("editor-html");
var editorCSS = ace.edit("editor-css");
var editorJS = ace.edit("editor-js");

var editors = [editorHTML, editorCSS, editorJS];
ace.require("ace/ext/language_tools");

editorHTML.session.setMode("ace/mode/html")
editorCSS.session.setMode("ace/mode/css")
editorJS.session.setMode("ace/mode/javascript")

editors.forEach(e => {
  e.setTheme("ace/theme/monokai");
  e.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false,
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
  });
  e.session.setUseWrapMode(true);  
})


// init
var iframeElement = document.getElementById("code");
var editorConfig = {};

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
editorHTML.setValue(editorConfig.codeSave.html)
editorCSS.setValue(editorConfig.codeSave.css)
editorJS.setValue(editorConfig.codeSave.js)

// default font size : 18px
const editorHTMLElement = document.getElementById('editor-html');
const editorCSSElement = document.getElementById('editor-css');
const editorJSElement = document.getElementById('editor-js');

editorHTMLElement.style.fontSize = editorConfig.defaultFontSize + 'px';
editorCSSElement.style.fontSize = editorConfig.defaultFontSize + 'px';
editorJSElement.style.fontSize = editorConfig.defaultFontSize + 'px';

iframeElement.src = getGeneratedPageURL(editorConfig.codeSave);

// live mode
var checkLiveCode = document.getElementById('livecode')

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