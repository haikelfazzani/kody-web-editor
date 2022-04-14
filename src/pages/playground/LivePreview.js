import React, { useContext } from 'react';
import Split from 'react-split';
import { PlaygroundContext } from '../../store/PlaygroundProvider';
import LiveConsole from './LiveConsole';
import LiveIframe from './LiveIframe';

export default function LivePreview() {
  const isMobile = window.innerWidth < 700;
  const { playgroundState, dispatch } = useContext(PlaygroundContext);

  return <Split direction={isMobile ? "horizontal" : "vertical"}
    gutterSize={7}
    sizes={playgroundState.showConsole ? [50, 50] : [100, 0]}
    minSize={0}
    className={"w-100 d-flex" + (isMobile ? "" : " flex-column")}>

    <LiveIframe />
    <LiveConsole playgroundState={playgroundState} dispatch={dispatch} />
  </Split>
}
