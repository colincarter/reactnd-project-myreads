import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const Bookshelf = ({ title, books, shelfName, moveBookToShelf }) =>
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
                book={book}
                shelfName={shelfName}
                moveBookToShelf={moveBookToShelf}
              />
            </li>
          )}
      </ol>
    </div>
  </div>;

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default Bookshelf;
