var editor = ace.edit("editor");
ace.require("ace/ext/language_tools");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
document.getElementById('editor').style.fontSize = '18px';

editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false,
  autoScrollEditorIntoView: true,
  copyWithEmptySelection: true,
});

var iframe = document.getElementById("code");
var result = `
<button id="btn">click</button>
<p id="res"></p>
<script>
document.getElementById('btn').addEventListener('click' , () =>{
    document.getElementById('res').textContent = 'hello world'
})
</script>`;
editor.setValue(result);
iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(result);

editor.session.on('change', function (delta) {
  result = editor.getValue();
});


document.getElementById('btn-run').addEventListener('click', () => {
  iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(result);
})