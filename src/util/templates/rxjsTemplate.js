const rxjsTemplate = [
  `<h1>Welcome to Kody</h1>`,
  'body { color: red; }',
  `const source = Rx.Observable.timer(1000, 2000);

const subscribe = source.subscribe(val => console.log(val));`
];

export default rxjsTemplate;