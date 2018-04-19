import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import "./index.css";
import App from "./containers/app/App";

import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import 'antd/dist/antd.css';
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Popper = require("popper.js");
require("bootstrap/dist/js/bootstrap");

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
