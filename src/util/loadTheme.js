export default function loadTheme(theme) {
  if (!document.getElementById(theme)) {
    const base_url = `https://cdn.jsdelivr.net/npm/ace-builds@1.4.14/src-min-noconflict/theme-${theme}.js`;
    
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.id = theme;
    script.src = base_url;
    
    const rootEl = document.getElementById('root');
    rootEl.parentNode.insertBefore(script, rootEl.previousElementSibling);
  }
}