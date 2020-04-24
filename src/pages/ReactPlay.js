import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import SplitPane from '../components/SplitPane';
import Button from '../components/Button';
import logo from '../img/logo192.png';
import { Link } from 'react-router-dom';
import Editor from '../components/Editor';
import { downloadAsJsx } from '../util/download-file';

const codeJsx = `function Button({ onClick }) {
  return <button onClick={onClick}>click</button>
}

function App() {
  const [count, setCount] = React.useState(0);
  
  const onCount = () => setCount(count + 1);
  
  return <div>{count} <Button onClick={onCount} /></div>
}

render(<App />, document.getElementById('root'))`;

export default function ReactPlay () {

  const [codeEditor, setEditorCode] = useState(codeJsx);
  const [code, setCode] = useState(codeEditor);
  const [isRunning, setIsRunning] = useState(false);

  const onChange = (v) => { setEditorCode(v); }
  const onRun = () => {
    setIsRunning(true);
    setTimeout(() => { setIsRunning(false); }, 800);
  }
  const onDownload = () => { downloadAsJsx(codeEditor); }

  useEffect(() => { setCode(codeEditor); }, [isRunning]);

  return <main>

    <Sidebar>
      <ul>
        <li>
          <Button onClick={onRun} clx={isRunning ? "bg-green" : "bg-rose"} text={<i className="fas fa-play"></i>} />
        </li>
      </ul>

      <ul>
        <li className="border-top mb-10">
          <Button onClick={onDownload} clx="bg-gray" text={<i className="fas fa-download"></i>} />
          <Link to="/"><img src={logo} alt="logo.." className="img-logo" /></Link>
        </li>
      </ul>
    </Sidebar>

    <div className="react-code-editor">

      <LiveProvider code={code} noInline={true}>
        <SplitPane name="react-split-pane">
          <Editor onChange={onChange} value={codeEditor} mode="jsx" />
          <div className="lp"><LivePreview /><LiveError /></div>
        </SplitPane>
      </LiveProvider>

    </div>
  </main>;
}