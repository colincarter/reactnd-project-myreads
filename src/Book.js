import React from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";

class Book extends React.Component {
  moveBook = (fromShelf, toShelf) => {
    if (fromShelf !== toShelf && toShelf !== "none") {
      this.props.moveBookOnShelf(this.props.book, fromShelf, toShelf);
    }
  };

  render() {
    const { book, shelfName } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.thumbnail}")`
            }}
          />
          <Menu shelfName={shelfName} moveBook={this.moveBook} />
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {book.authors.join(",")}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBookOnShelf: PropTypes.func.isRequired
};

export default Book;
