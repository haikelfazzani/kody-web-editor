
import cdns from "./cdns";
import Compiler from "./Compiler";

export default async function tabsToString (preprocessors) {
  try {
    let tabs = localStorage.getItem('kody-tabs');
    tabs = JSON.parse(tabs);

    if (tabs.length === 3) {
      let typeText = preprocessors.js === 'babel'
        ? 'text/babel' : preprocessors.js === 'coffeescript'
          ? 'text/coffeescript' : 'text/javascript';

      tabs[0] = `<script type="text/javascript" src="${cdns[preprocessors.js]}"></script>\n` + tabs[0];

      tabs[1] = await Compiler.toCss(preprocessors.css, tabs[1]);
      tabs[1] = `<style>${tabs[1]}</style>`;

      tabs[2] = `<script type="${typeText}">${tabs[2]}</script>`;
    }

    return tabs.join('\n');
  } catch (error) {
    return error.message;
  }
}