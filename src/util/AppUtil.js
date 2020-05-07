import copyToClipboard from './copyToClipboard';

let initTabState = {
  tabs: [
    { name: 'Index.html', lang: 'htmlmixed', index: 0, code: '<h1>Welcome to Kody</h1>', icon: 'fab fa-html5' },
    { name: 'Style.css', lang: 'css', index: 1, code: 'body { color: red; }', icon: 'fab fa-css3' },
    { name: 'App.js', lang: 'javascript', index: 2, code: 'console.log("hello world")', icon: 'fab fa-js' }
  ],
  activeTabIndex: 0
};

export default class LocalDb {

  static getTabState () {
    let local = localStorage.getItem('kody-tabs');
    return local ? JSON.parse(local) : initTabState;
  }

  static getTabStateAsString () {
    let local = localStorage.getItem('kody-tabs');
    return local || initTabState;
  }

  static getTabs () {
    return this.getTabState().tabs;
  }

  static getCurrentTabCode () {
    let tabState = this.getTabState();
    return tabState.tabs[tabState.activeTabIndex].code;
  }

  // generate an html file and download it
  static generateTemplateAndDownload () {
    let codeResult = this.getTabState().tabs;

    let text = `
<html>
  <head>
    <style>
      ${codeResult[1].code}
    </style>
  </head>
  <body>

    ${codeResult[0].code} 

    <script>
      ${codeResult[2].code}
    </script>
  </body>
</html>
      `;

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'kody.html');

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  static generateSharedURL () {
    const encodedData = window.btoa(this.getTabStateAsString());
    let url = window.location.origin + '/playground?bin=' + encodedData;

    copyToClipboard(url);
    return url;
  }

  static generateSharedIframe () {
    const dataEncoded = window.btoa(this.getTabStateAsString());
    let genUrl = window.location.origin + '/playground?bin=' + dataEncoded;

    genUrl = `<iframe src="${genUrl}" title="kody" width="500" height="500"></iframe>`;

    copyToClipboard(genUrl);
    return genUrl;
  }
}