import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Keep track of the store
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";

// set up redux and add middlewares with the compose keyword
const store = createStore(reducers, compose(applyMiddleware(thunk))); //reducers and enhancers

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
