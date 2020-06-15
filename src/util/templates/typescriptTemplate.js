const typescriptTemplate = [
  '<h1>Welcome to Kody</h1>',
  'body { color: red; }',
  `interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kv1: KeyPair<number, string> = { key:1, value:"Kody" }; // OK
let kv2: KeyPair<number, number> = { key:1, value:12345 }; // OK
console.log(kv2)`
];

export default typescriptTemplate;