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
var checkLiveCode = document.getElementById('livecode')
var userCode = '';

var editorConfig = {
  defaultFontSize: 18,
  liveCode: false,
  codeSave: ''
};

// init
(function () {  
  if (localStorage.getItem('editor-config')) {
    editorConfig = JSON.parse(localStorage.getItem('editor-config'));
    checkLiveCode.checked = editorConfig.liveCode;
  }

  /** get saved code from localStorage */  
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
})()