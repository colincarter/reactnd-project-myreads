import React from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";

const Book = ({ title, authors, thumbnail, shelfName }) =>
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
      <Menu shelfName={shelfName} />
    </div>
    <div className="book-title">
      {title}
    </div>
    <div className="book-authors">
      {authors.join(",")}
    </div>
  </div>;

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  thumbnail: PropTypes.string.isRequired
};

export default Book;
