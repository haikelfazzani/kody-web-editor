function compile () {

  
  var editor = document.getElementById("editor");
  var iframe = document.getElementById("code");

  //iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);


  document.body.onkeyup = function () {


    var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
 
     if (iframedoc){
console.log(editor.value);

         iframedoc.body.innerHTML = (editor.value);
     } else {
        //just in case of browsers that don't support the above 3 properties.
        //fortunately we don't come across such case so far.
        alert('Cannot inject dynamic contents into iframe.');
     }
    
  };
}

compile();