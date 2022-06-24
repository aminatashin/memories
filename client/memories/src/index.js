import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { addFetchPost } from "../src/slice/postSlice";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(addFetchPost());
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
