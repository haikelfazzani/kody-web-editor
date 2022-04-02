const nanojsxTemplate = [
  `<script src="https://unpkg.com/nano-jsx/bundles/nano.full.min.js"></script>`,
  'body { color: red; }', // css
  `/** @jsx Nano.h */
const Nano = nanoJSX;
const { Component } = Nano;

const SayHello = ({ children }) => <h1>{children}</h1>;

class App extends Component {
  render() {
    const title = 'Hello JSX!';

    return (
      <div>
        <SayHello>{title}</SayHello>
        <p>
          Lightweight <b>1kB</b> JSX library.
        </p>
      </div>
    );
  }
}

Nano.render(<App name="Nano" />, document.body);`];

export default nanojsxTemplate;