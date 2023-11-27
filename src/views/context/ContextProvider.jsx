import { useState, useEffect } from "react";
import WebContext from "./WebContext";

const DEFAULT_HEADER_HEIGHT = 0;

function ContextProvider({ product, children }) {
  const [windowDimension, detectHW] = useState({
    maxContentHeight: window.innerHeight - DEFAULT_HEADER_HEIGHT,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight
  });

  const detectSize = () => {
    detectHW({
      maxContentHeight: window.innerHeight - DEFAULT_HEADER_HEIGHT,
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, [windowDimension]);

  return (
    <WebContext.Provider
      value={{
        product,
        windowDimension
      }}
    >
      {children}
    </WebContext.Provider>
  );
}

export default ContextProvider;
