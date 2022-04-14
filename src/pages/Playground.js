import React from 'react';
import { withRouter } from 'react-router-dom';
import { PlaygroundProvider } from '../store/PlaygroundProvider';
import LiveEditor from './playground/LiveEditor';
import Menu from './playground/Menu';
import LivePreview from './playground/LivePreview';
import Split from 'react-split';

function Playground() {
  const isMobile = window.innerWidth < 700;

  return (<PlaygroundProvider>
    <div className="playground">
      <Menu />

      <Split
        minSize={0}
        direction={isMobile ? "vertical" : "horizontal"}
        cursor="col-resize"
        gutterSize={7}
        className={"h-100 d-flex" + (isMobile ? " flex-column" : "")}
        sizes={isMobile ? [70, 30] : [50, 50]}
      >
        <LiveEditor />
        <LivePreview />
      </Split>
    </div>
  </PlaygroundProvider>);
}

export default withRouter(Playground);