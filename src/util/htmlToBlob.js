let ov = `
var origLog = console.log;
// here, the contents of console.log will be stored
var consoleBuffer = [];

// replace console.log with own function
console.log = function () {
   var args = Array.prototype.slice.call(arguments);
   
   // I would not store an infinite amount of entries,
   // so remove oldest one if 10 stored
   if (consoleBuffer.length === 10) consoleBuffer.pop();

   // remember
   consoleBuffer.push(args);

   // call original function
   origLog.apply(console, args);
};`;

let dp = `
let fv=consoleBuffer.flat();
console.log(fv)
for(let i = 0; i < fv.length ;i++) {
  document.getElementById('dp').innerHTML += '<li>'+fv[i]+'</li>';
}
`;

export default function htmlToBlob (html, css, js) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  let cssURL = getBlobURL(css, 'text/css');
  let jsURL = getBlobURL(ov + js, 'text/javascript');
  let dpURL = getBlobURL(dp, 'text/javascript');

  const source = `
<!doctype html>
<html>
  <head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
  <link rel="stylesheet" type="text/css" href="${cssURL}" />  
  <style>
  *,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
    body { margin:0; padding0;   overflow-x: hidden; }
    #dp {
      margin:0;
      list-style:none;
      width:100%; height:50%; 
      position: fixed; 
      bottom:0; 
      left:0; 
      background-color: #333333;
      color: #dadada; padding:0;    
      border-top: 10px solid #222222;  
      overflow-y:auto;
    }
    #dp  li {border-bottom: 1px solid #393838; padding:15px;     word-break: break-all; }
  </style>
  </head>

  <body>
    ${html}   

    <ul id="dp"></ul>
    <script src="${jsURL}"></script>
    <script src="${dpURL}"></script>
  </body>
</html>`;

  return getBlobURL(source, 'text/html');
}