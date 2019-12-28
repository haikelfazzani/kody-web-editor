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

    axios.get(`https://box-server.unubo.app/runcode?lang=javascript&content=${editorConfig.codeSave.js}`)
      .then(resp => resp.data)
      .then(r => {
        
        iframeConsole.innerHTML = '';
        const successRes = r.data.stdout.replace(/\n/ig, '-').split('-');

        successRes.forEach(d => {
          if (d && d.length > 0 && iframeConsole) {
            iframeConsole.innerHTML += `<li>${d}</li>`;
          }
        });

        if (r.data.stderr && r.data.stderr.length > 10) {
          iframeConsole.innerHTML = `<li style="color:#dc3545">${r.data.stderr}</li>`;
        }

      })
      .catch(e => {
        console.log(e)
      })
  }
});