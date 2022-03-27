const lodashTemplate = [
  `<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<p>Open terminal to see result</p>`,
  'body { color: red; }',
  `let res = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log(res)`
];

export default lodashTemplate;