import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import "antd/dist/antd.css";

ReactDOM.render(
  <ConfigProvider local={ptBR}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
