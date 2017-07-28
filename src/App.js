import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Search from "./Search";
import Home from "./Home";
import "./App.css";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;
