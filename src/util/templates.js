const vanillaTemplate = [
  '<h1>Welcome to Kody</h1>',
  'body { background: #fff; color: red; }',
  `console.log('Welcome to Kody')`
];

const templates = {
  local: localStorage.getItem('tabs') ? JSON.parse(localStorage.getItem('tabs')) : vanillaTemplate,
  ...localStorage.getItem('templates') ? JSON.parse(localStorage.getItem('templates')) : []
}

export default templates;
