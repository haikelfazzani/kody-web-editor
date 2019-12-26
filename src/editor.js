/** save editor config */
function saveConfigs () {
  localStorage.setItem('editor-config', JSON.stringify(editorConfig))
}

/** live code */
checkLiveCode.addEventListener('change', (e) => {
  editorConfig.liveCode = checkLiveCode.checked;
  saveConfigs()
})

/** on change editor value */
editor.session.on('change', function (delta) {
  if (editorConfig.liveCode) {
    userCode = editor.getValue();
    iframeElement.src = 'data:text/html;charset=utf-8,' + encodeURI(userCode);
  }
});

/** btn run in nav : run code */
document.getElementById('btn-run').addEventListener('click', () => {
  if (!editorConfig.liveCode) {
    iframeElement.src = 'data:text/html;charset=utf-8,' + encodeURI(userCode);
  }
}, false)

/** save code into localstorage */
document.getElementById('btn-save').addEventListener('click', () => {
  localStorage.setItem('code-save', JSON.stringify(userCode))
}, false)

/**  btn download in nav : download code */
document.getElementById('btn-download').addEventListener('click', () => {
  downloadAsFile('code.js', userCode)
}, false)

/**  btn clear in nav : clear editor */
document.getElementById('btn-clear').addEventListener('click', () => {
  editor.setValue('');
}, false)

/** Font size : increase - decrease */
editorElement.style.fontSize = editorConfig.defaultFontSize + 'px';
document.getElementById('btn-font-plus').addEventListener('click', () => {
  editorConfig.defaultFontSize++;
  editorElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  saveConfigs()
})

document.getElementById('btn-font-minus').addEventListener('click', () => {
  editorConfig.defaultFontSize--;
  editorElement.style.fontSize = editorConfig.defaultFontSize + 'px';
  saveConfigs()
})