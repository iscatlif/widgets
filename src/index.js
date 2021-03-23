import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

// TODO make this conditional on development environment?
// if (module.hot) {
//   module.hot.accept();
// }
