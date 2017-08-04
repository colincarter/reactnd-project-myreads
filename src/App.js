import React from "react";
import { Route } from "react-router-dom";
import { getAll, update } from "./BooksAPI";
import Search from "./Search";
import Home from "./Home";
import { rawBookToBook } from "./util";
import { READ, WANT_TO_READ, CURRENTLY_READING, NONE } from "./util";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    [READ]: [],
    [NONE]: [],
    [WANT_TO_READ]: [],
    [CURRENTLY_READING]: [],
    isLoading: false
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const books = await getAll();

    books.forEach(book => {
      this.moveBookToShelf(rawBookToBook(book), NONE, book.shelf);
    });
  };

  moveBookToShelf = (book, from, to) => {
    this.setState(
      state => {
        return {
          [from]: state[from].filter(books => books.id !== book.id),
          [to]: [...state[to], book],
          isLoading: false
        };
      },
      async () => {
        await update(book, to);
      }
    );
  };

  renderHome = props =>
    <Home {...props} {...this.state} moveBookToShelf={this.moveBookToShelf} />;

  renderSearch = props =>
    <Search
      {...props}
      {...this.state}
      moveBookToShelf={this.moveBookToShelf}
    />;

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={this.renderHome} />
        <Route path="/search" component={this.renderSearch} />
      </div>
    );
  }
}

export default BooksApp;
