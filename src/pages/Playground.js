import React from 'react';
import { withRouter } from 'react-router-dom';
import Split from 'react-split';

import { PlaygroundProvider } from '../store/PlaygroundProvider';

import LiveEditor from '../containers/playground/LiveEditor';
import LivePreview from '../containers/playground/LivePreview';
import Menu from '../containers/top-menu/index';

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