import React, { useState, createContext } from 'react';

const GlobalContext = createContext();

/** init values global state */
let initState = {
  fontSize: 16,
  currentTabIndex: 0,
  template: 'default'
};

export default function GlobalState ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}

export { GlobalContext, GlobalState };