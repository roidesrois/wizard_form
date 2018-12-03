// Core
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import { ConnectedRouter as Router } from 'connected-react-router';
import { HashRouter as Router } from "react-router-dom";

// Instruments
import { store, history } from "./init/store";
import "./theme/init";

import { Main } from "./routes/Main";

render(
  <Provider store={store}>
    {/* history = { history } */}
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("app")
);
