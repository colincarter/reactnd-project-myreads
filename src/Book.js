import React from "react";
import Menu from "./Menu";

const Book = ({ title, authors, thumbnail }) =>
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
      <Menu />
    </div>
    <div className="book-title">
      {title}
    </div>
    <div className="book-authors">
      {authors.join(",")}
    </div>
  </div>;

export default Book;
