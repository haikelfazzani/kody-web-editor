/** save editor config */
function saveConfigs () {
  editorConfig.codeSave = {
    html: editorHTML.getValue(),
    css: editorCSS.getValue(),
    js: editorJS.getValue()
  };
  localStorage.setItem('editor-config', JSON.stringify(editorConfig))
}

/** live code */
checkLiveCode.addEventListener('change', (e) => {
  editorConfig.liveCode = checkLiveCode.checked;
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
  editor.setValue('');
}, false)

/** Font size : increase - decrease */
document.getElementById('btn-font-plus').addEventListener('click', () => {
  editorConfig.defaultFontSize++;
  editorHTMLElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  editorCSSElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  editorJSElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  saveConfigs();
})

document.getElementById('btn-font-minus').addEventListener('click', () => {
  editorConfig.defaultFontSize--;
  editorHTMLElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  editorCSSElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  editorJSElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  saveConfigs();
});