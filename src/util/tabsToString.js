export default function tabsToString (resources, template) {
  let getTabs = localStorage.getItem('kody-tabs');

  if (getTabs && JSON.parse(getTabs).length === 3) {

    let nResources = resources.reduce((a, r) => {
      return a + `<script src="${r}"></script>`
    }, '');

    getTabs = JSON.parse(getTabs);
    let jsValue = getTabs[2];

    const cassets = ['react', 'preact'];
    let typeAsset = template !== 'coffeescript' ? 'text/javascript' : 'text/coffeescript';

    if (cassets.includes(template)) {
      jsValue = window.Babel.transform(getTabs[2], {
        envName: 'production',
        presets: ['react', 'es2015'],
        babelrc: false
      }).code;
    }

    getTabs = [
      nResources,
      getTabs[0],
      `<style>${getTabs[1]}</style>`,
      `<script type="${typeAsset}">${jsValue}</script>`
    ];

    return getTabs.join('\n');
  }
}