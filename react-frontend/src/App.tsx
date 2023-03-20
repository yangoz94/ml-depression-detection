import { useRef, RefObject, useState, useCallback } from "react";
import IntroContainer from "./containers/IntroContainer";
import DefinitionsContainer from "./containers/DefinitionsContainer";
import DemoContainer from "./containers/DemoContainer";
import { RefContext } from "./contexts/RefContext";

function App() {
  // forwardRef can also be used to pass refs to child components but this seems to be easier for multiple refs despite some unnecessary rendering
  const refs = {
    demoRef: useRef() as RefObject<HTMLDivElement>,
    inputRef: useRef() as RefObject<HTMLTextAreaElement>,
  };

  return (
    <>
      <RefContext.Provider value={refs}>
        <IntroContainer />
        <DefinitionsContainer />
        <DemoContainer />
      </RefContext.Provider>
    </>
  );
}

export default App;
