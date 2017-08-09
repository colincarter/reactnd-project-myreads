import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import Spinner from "react-spinkit";
import { spinnerStyle, rawBookToBook, findShelf } from "./util";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  /**
   * Some local state to this component for managing the search result
   */
  state = { books: [], isLoading: false };

  /**
   * Ensure the input field is focused ready for text input
   */
  componentDidMount = () => {
    this.searchInput.focus();
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    // Don't update the display if there isn't a search term present but there
    // are books to display.  This occurs when the search field is rapidly
    // cleared and there are api requests still pending.
    return !(this.searchInput.value === "" && nextState.books.length > 0);
  };

  /**
   * Query the API based on the query parameter
   * @param {string} query - the query term
   */
  queryAPI = async query => {
    const books = await BooksAPI.search(query);

    this.setState({ isLoading: false });

    if (books && !books.error) {
      this.setState({ books });
    }
  };

  /**
   * onChange is called on every change in the search query field. It prevents 
   * hammering the API by using the debounce function which only calls the
   * API 150 milliseconds after it was last called.
   */
  onChange = event => {
    const query = event.target.value;

    if (query.length) {
      this.setState({ isLoading: true });
      this.debounced = debounce(() => this.queryAPI(query), 150);
      this.debounced();
    } else {
      this.debounced.cancel();
      this.setState({ books: [], isLoading: false });
    }
  };

  /**
   * Moves a book to a shelf by delegating to the parent component
   */
  moveBookToShelf = (book, fromShelf, toShelf) => {
    this.props.moveBookToShelf(book, fromShelf, toShelf);
  };

  renderBook = (rawBook, index) => {
    const book = rawBookToBook(rawBook);
    const shelf = findShelf(book, this.props);

    return (
      <li key={index}>
        <Book
          book={book}
          moveBookToShelf={this.moveBookToShelf}
          shelfName={shelf || rawBook.shelf}
        />
      </li>
    );
  };

  renderSpinner = () => {
    return <Spinner name="three-bounce" fadeIn="half" style={spinnerStyle} />;
  };

  back = () => {
    this.props.history.push("/");
  };

  render() {
    let { books, isLoading } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.back}>
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
          {isLoading
            ? this.renderSpinner()
            : <ol className="books-grid">
                {books.map((book, index) => this.renderBook(book, index))}
              </ol>}
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
