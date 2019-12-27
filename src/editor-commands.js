editors.forEach(e => {  
  // run code
  e.commands.addCommand({
    name: 'runcode',
    bindKey: { win: 'Ctrl-r', mac: 'Command-r' },
    exec: function (editor) {
      iframeElement.src = getGeneratedPageURL({
        html: editorHTML.getValue(),
        css: editorCSS.getValue(),
        js: editorJS.getValue()
      });
    },
    readOnly: true // false if this command should not apply in readOnly mode
  });

  // save code
  e.commands.addCommand({
    name: 'savecode',
    bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
    exec: function (editor) {
      saveConfigs ()
    },
    readOnly: true // false if this command should not apply in readOnly mode
  });
})