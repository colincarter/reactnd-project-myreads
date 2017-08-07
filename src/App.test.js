import React from "react";
import ReactDOM from "react-dom";
import localStorage from "mock-local-storage";
import fetch from "isomorphic-fetch";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
});
