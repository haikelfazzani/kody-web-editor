var editor = ace.edit("editor");
ace.require("ace/ext/language_tools");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");

editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false,
  autoScrollEditorIntoView: true,
  copyWithEmptySelection: true,
});

var iframeElement = document.getElementById("code");
var editorElement = document.getElementById('editor');

var editorConfig = {
  defaultFontSize: 18
};

/** Font size */
editorElement.style.fontSize = editorConfig.defaultFontSize + 'px';
document.getElementById('btn-font-plus').addEventListener('click', () => {
  editorConfig.defaultFontSize++;
  editorElement.style.fontSize = editorConfig.defaultFontSize + 'px';
})

document.getElementById('btn-font-minus').addEventListener('click', () => {
  editorConfig.defaultFontSize--;
  editorElement.style.fontSize = editorConfig.defaultFontSize + 'px';
})

/** get saved code from localStorage */
var userCode = '';
if (localStorage.getItem('code-save')) {
  userCode = JSON.parse(localStorage.getItem('code-save'))
} else {
  userCode = `
<button id="btn">click</button>
<p id="res"></p>
<script>
document.getElementById('btn').addEventListener('click' , () =>{
    document.getElementById('res').textContent = 'hello world'
})
</script>`;
}

editor.setValue(userCode);
iframeElement.src = 'data:text/html;charset=utf-8,' + encodeURI(userCode);

editor.session.on('change', function (delta) {
  userCode = editor.getValue();
});

document.getElementById('btn-run').addEventListener('click', () => {
  iframeElement.src = 'data:text/html;charset=utf-8,' + encodeURI(userCode);
})

/** save code into localstorage */
document.getElementById('btn-save').addEventListener('click', () => {
  localStorage.setItem('code-save', JSON.stringify(userCode))
})