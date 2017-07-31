import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const Bookshelf = ({ title, books, shelfName }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {title}
    </h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.length > 0 &&
          books.map((book, index) =>
            <li key={`${shelfName}-${index}`}>
              <Book
                title={book.title}
                authors={book.authors}
                thumbnail={book.thumbnail}
                shelfName={shelfName}
              />
            </li>
          )}
      </ol>
    </div>
  </div>;

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default Bookshelf;
