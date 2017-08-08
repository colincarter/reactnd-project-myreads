import React from "react";
import ReactDOM from "react-dom";
import localStorage from "mock-local-storage";
import fetch from "isomorphic-fetch";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function delay(ms) {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });
}

it("renders without crashing", async done => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  await delay(3000).then(done);
});
