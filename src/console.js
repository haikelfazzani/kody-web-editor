const ifCons = document.querySelector('.console-wrapper');

document.getElementById('btn-console').addEventListener('click', () => {
  ifCons.style.display = ifCons.style.display === 'block' ? 'none' : 'block';
})

document.getElementById('close-console').addEventListener('click', () => {
  ifCons.style.display = ifCons.style.display === 'block' ? 'none' : 'block';
})


document.getElementById('btn-run').addEventListener('click', () => {

  if (editorConfig.codeSave.js && editorConfig.codeSave.js.length > 10) {

    var iframeConsole = document.querySelector('.iframe-console>ul');

    iframeConsole.innerHTML = eval(editorConfig.codeSave.js );
  }
});