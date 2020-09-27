import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles/index.less";

if (module.hot) {
  module.hot.accept();
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
