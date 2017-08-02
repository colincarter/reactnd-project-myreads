import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  constructor() {
    super();
    this.state = { books: [], query: "" };
    this.requestID = null;
  }

  queryAPI = query => {
    BooksAPI.search(query).then(books => {
      if (books && !books.error) {
        this.setState({ books, query });
      }
    });
  };

  onChange = event => {
    const query = event.target.value;

    if (query.length > 0) {
      this.debounced = debounce(() => this.queryAPI(query), 500);
      this.debounced();
    } else {
      this.debounced.cancel();
      this.setState({ books: [], query: "" });
    }
  };

  moveBookOnShelf = () => {};

  renderBook = (rawBook, index) => {
    const book = {
      title: rawBook.title,
      authors: rawBook.authors || "",
      thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : ""
    };

    return (
      <li key={index}>
        <Book
          book={book}
          moveBookOnShelf={this.moveBookOnShelf}
          shelfName={rawBook.shelf}
        />
      </li>
    );
  };

  render() {
    let { books, query } = this.state;

    if (query === "") {
      books = [];
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            onClick={() => this.props.history.push("/")}
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            {/*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
  */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book, index) => this.renderBook(book, index))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired
};

export default Search;
