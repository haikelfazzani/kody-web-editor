const preactTemplate = [
  `<script src="https://unpkg.com/preact@10/dist/preact.umd.js"></script>
<script src="https://unpkg.com/preact@10/hooks/dist/hooks.umd.js"></script>`,
  'body { color: red; }', // css
  `/** @jsx h */
const { h, render } = preact;
const { useState } = preactHooks;

const App = () => {
  const [count, setCount] = useState(0);

  const inc = () => setCount(count + 1);

  const dec = () => setCount(count - 1);

  return (
    <div>
      <h1>Preact</h1>
      <h2>{count}</h2>
      <button onClick={inc}>Increment</button>
      <button onClick={dec}>Decrement</button>
    </div>
  )
}

render(<App />, document.body)`];

export default preactTemplate;