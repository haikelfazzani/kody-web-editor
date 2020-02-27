let ov = `
var origLog = console.log;
var consoleBuffer = [];

window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = "script error";
  if (string.indexOf(substring) > -1){
    consoleBuffer.push('Script Error: See Browser Console for Detail');
  } else {
    var message = [
      'Message: ' + msg ,
      '<br>Line: ' + (lineNo-28) ,
      '<br>Column: ' + columnNo ,
      '<br>Error object: ' + JSON.stringify(error)
    ].join(' ');

    consoleBuffer.push('<span style="color: #f35c5c">'+ message +'</span>');
  }

  return false;
};

console.log = function () {
   var args = Array.prototype.slice.call(arguments);
   if (consoleBuffer.length === 10) consoleBuffer.pop();
   consoleBuffer.push(args);
   origLog.apply(console, args);
};`;

let dp = `
let fv=consoleBuffer.flat();
console.log(fv)
for(let i = 0; i < fv.length ;i++) {
  if (typeof fv[i] === 'object') {
    document.getElementById('dp').innerHTML += '<li><pre>'+ JSON.stringify(fv[i], null,2) +'</pre></li>';
  }
  else if (typeof fv[i] === 'number') {
    document.getElementById('dp').innerHTML += '<li><pre style="color: #d0782a">'+ fv[i] +'</pre></li>';
  }
  else document.getElementById('dp').innerHTML += '<li><pre>'+ fv[i] +'</pre></li>';
}`;

export default function cosLogs (html, js) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  let jsURL = getBlobURL(ov + js, 'text/javascript');
  let dpURL = getBlobURL(dp, 'text/javascript');

  const source = `
<!doctype html>
<html>
  <head>
  <title>console</title>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
  <style>
  *,*::before,*::after {box-sizing: border-box;}
    body { background-color: #333333; margin:0; padding:0; overflow-x: hidden; }
    #dp { margin:0; list-style:none; width:100%; padding:0; }
    #dp  li {border-bottom: 1px solid #393838; padding:10px 15px;  word-break: break-all; }
    p { margin:0; background-color: #222222; color: #fff; padding:10px 15px; font-size: 12px; }  
    pre {color: #c3cb59;  margin:0; font-size: 14px; } 
    
::-webkit-scrollbar {width: 7px;}
::-webkit-scrollbar-track {background: #474141;}
::-webkit-scrollbar-thumb {background: #535151;}
::-webkit-scrollbar-thumb:hover {background: #7c7c7c;}
  </style>
  </head>

  <body>
    <div style="display: none">${html}</div>

    <p>Console</p>
    <ul id="dp"></ul>
    <script src="${jsURL}"></script>
    <script src="${dpURL}"></script>
  </body>
</html>`;

  return getBlobURL(source, 'text/html');
}