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

  /**
   * Loads current state of the bookshelf when this component
   * is mounted.
   */
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const books = await getAll();

    books.forEach(book => {
      this.moveBookToShelf(rawBookToBook(book), NONE, book.shelf);
    });
  };

  /**
   * Moves a book from one bookshelf to another.  This function also updates the
   * API with the bookshelf the book has moved to.
   *
   * @param {object} book - The book object to move
   * @param {string} from - the bookshelf to move from
   * @param {string} to - the bookshelf to move to
   */
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
