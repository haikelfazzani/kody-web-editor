const coffeescriptTemplate = [
  '<button onclick="printHello()">click here</button>',
  'body { background: #fff; color: red; }',
  `@printHello = -> alert "Hello Kody"`
];

export default coffeescriptTemplate;