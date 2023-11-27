import React from "react";

const WebContext = React.createContext({
  product: {},
  version: {},
  routes: [],
  windowDimension: {
    maxContentHeight: window.innerHeight,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight
  }
});

export default WebContext;
