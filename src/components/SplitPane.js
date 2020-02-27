import React, { useState } from 'react';
import Split from 'react-split';

export default function SplitPane ({ children, name, direction = "horizontal" }) {

  const [sizes] = useState(() => {
    let localSizes = localStorage.getItem(name);
    return localSizes ? JSON.parse(localSizes) : [50, 50];
  });

  const onDragEnd = v => {
    localStorage.setItem(name, JSON.stringify(v));
  }

  return <Split sizes={sizes}
    onDragEnd={onDragEnd}
    minSize={0}
    gutterSize={7}
    gutterAlign="center"
    direction={direction}
  >
    {children}
  </Split>;
}