const reactTemplate = [
  `<div id="app"></div>`,
  'body { color: red; }',
  `function App(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

ReactDOM.render(<App numbers={numbers} />, document.getElementById('app'))`];

export default reactTemplate;