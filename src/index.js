import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
// import AuthContextProvider from './context/authContext';
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {/* <AuthContextProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </AuthContextProvider> */}
  </Router>
);
