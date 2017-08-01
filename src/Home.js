import React from "react";
import PropTypes from "prop-types";
import Bookshelf from "./Bookshelf";

class Home extends React.Component {
  search = () => {
    this.props.history.push("/search");
  };

  render() {
    const { moveBookToShelf, currentlyReading, read, wantToRead } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              shelfName="currentlyReading"
              books={currentlyReading}
              moveBookOnShelf={moveBookToShelf}
            />
            <Bookshelf
              title="Read"
              shelfName="read"
              books={read}
              moveBookOnShelf={moveBookToShelf}
            />
            <Bookshelf
              title="Want to Read"
              shelfName="wantToRead"
              books={wantToRead}
              moveBookOnShelf={moveBookToShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <a onClick={this.search}>Add a book</a>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  moveBookToShelf: PropTypes.func.isRequired,
  currentlyReading: PropTypes.arrayOf(PropTypes.object).isRequired,
  wantToRead: PropTypes.arrayOf(PropTypes.object).isRequired,
  read: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Home;
