// get editors elements
const editorHTMLElement = document.getElementById('editor-html');
const editorCSSElement = document.getElementById('editor-css');
const editorJSElement = document.getElementById('editor-js');

// set default font size : 18px
changeFontSize(editorHTMLElement, editorConfig.defaultFontSize)
changeFontSize(editorCSSElement, editorConfig.defaultFontSize)
changeFontSize(editorJSElement, editorConfig.defaultFontSize)

/** save editor config */
function saveConfigs () {
  editorConfig = {
    defaultFontSize: editorConfig.defaultFontSize,
    liveCode: checkLiveCode.checked,
    codeSave: {
      html: editorHTML.getValue(),
      css: editorCSS.getValue(),
      js: editorJS.getValue()
    }
  };
  localStorage.setItem('editor-config', JSON.stringify(editorConfig))
}

/** live code */
checkLiveCode.addEventListener('change', (e) => {
  saveConfigs()
})

/** save code into localstorage */
document.getElementById('btn-save').addEventListener('click', () => {
  saveConfigs()
}, false)

/**  btn download in nav : download code */
document.getElementById('btn-download').addEventListener('click', () => {
  const codeSave = Object.keys(editorConfig.codeSave).map(c => editorConfig.codeSave[c]).join(' ')
  downloadAsFile('code.js', codeSave);
}, false)

/**  btn clear in nav : clear editor */
document.getElementById('btn-clear').addEventListener('click', () => {
  editors.forEach(e => { e.setValue(''); });
}, false)

/** Font size : increase - decrease */
document.getElementById('btn-font-plus').addEventListener('click', () => {
  editorConfig.defaultFontSize++;
  changeFontSize(editorHTMLElement, editorConfig.defaultFontSize)
  changeFontSize(editorCSSElement, editorConfig.defaultFontSize)
  changeFontSize(editorJSElement, editorConfig.defaultFontSize)
  saveConfigs();
})

document.getElementById('btn-font-minus').addEventListener('click', () => {
  editorConfig.defaultFontSize--;
  changeFontSize(editorHTMLElement, editorConfig.defaultFontSize)
  changeFontSize(editorCSSElement, editorConfig.defaultFontSize)
  changeFontSize(editorJSElement, editorConfig.defaultFontSize)
  saveConfigs();
});