const rxjsTemplate = [
  `<h1>Welcome to Kody</h1>
<script src="https://unpkg.com/rxjs@5.2.0/bundles/Rx.min.js"></script>`,
  'body { color: red; }',
  `const source = Rx.Observable.timer(1000, 2000);

const subscribe = source.subscribe(val => console.log(val));`
];

export default rxjsTemplate;