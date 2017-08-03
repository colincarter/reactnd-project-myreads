import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import Spinner from "react-spinkit";
import { spinnerStyle } from "./util";
import * as BooksAPI from "./BooksAPI";
import { rawBookToBook } from "./util";
import Book from "./Book";

class Search extends React.Component {
  constructor() {
    super();
    this.state = { books: [], query: "", isLoading: false };
  }

  componentDidMount = () => {
    this.searchInput.focus();
  };

  queryAPI = async query => {
    const books = await BooksAPI.search(query);

    this.setState({ isLoading: false });

    if (books && !books.error) {
      if (this.searchInput.value !== "") {
        this.setState({ books, query });
      }
    }
  };

  onChange = event => {
    const query = event.target.value;

    if (query.length) {
      this.setState({ isLoading: true });
      this.debounced = debounce(() => this.queryAPI(query), 150);
      this.debounced();
    } else {
      this.debounced.cancel();
      this.setState({ books: [], query: "", isLoading: false });
    }
  };

  moveBookToShelf = (book, fromShelf, toShelf) => {
    this.props.moveBookToShelf(book, fromShelf, toShelf);
  };

  renderBook = (rawBook, index) => {
    const book = rawBookToBook(rawBook);

    return (
      <li key={index}>
        <Book
          book={book}
          moveBookToShelf={this.moveBookToShelf}
          shelfName={rawBook.shelf}
        />
      </li>
    );
  };

  renderSpinner = () => {
    return <Spinner name="three-bounce" fadeIn="half" style={spinnerStyle} />;
  };

  render() {
    let { books, isLoading } = this.state;

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
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChange}
              ref={input => (this.searchInput = input)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isLoading && this.renderSpinner()}

          <ol className="books-grid">
            {books.map((book, index) => this.renderBook(book, index))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default Search;
