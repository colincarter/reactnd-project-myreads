import React from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  state = { books: [], query: "" };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    console.log(books);
    this.setState({ books: books });
  }

  onChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  moveBookOnShelf = () => {};

  renderBook = rawBook => {
    const book = {
      title: rawBook.title,
      authors: rawBook.authors,
      thumbnail: rawBook.imageLinks.thumbnail
    };

    return (
      <li>
        <Book book={book} moveBookOnShelf={this.moveBookOnShelf} />
      </li>
    );
  };

  render() {
    const { query, books } = this.state;

    let matchedBooks = books;

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      matchedBooks = books.filter(
        book => match.test(book.title) || match.test(book.authors.join(" "))
      );
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
            {matchedBooks.map(book => this.renderBook(book))}
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
