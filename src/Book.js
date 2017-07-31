import React from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";

class Book extends React.Component {
  moveBook = (fromShelf, toShelf) => {
    if (fromShelf !== toShelf) {
      this.props.moveBookOnShelf(this.props.title, fromShelf, toShelf);
    }
  };

  render() {
    const { title, authors, thumbnail, shelfName } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${thumbnail}")`
            }}
          />
          <Menu shelfName={shelfName} moveBook={this.moveBook} />
        </div>
        <div className="book-title">
          {title}
        </div>
        <div className="book-authors">
          {authors.join(",")}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  thumbnail: PropTypes.string.isRequired,
  moveBookOnShelf: PropTypes.func.isRequired
};

export default Book;
