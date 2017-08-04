import React from "react";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";
import { spinnerStyle } from "./util";
import Bookshelf from "./Bookshelf";

class Home extends React.Component {
  search = () => {
    this.props.history.push("/search");
  };

  renderSpinner = () => {
    return (
      <Spinner name="three-bounce" fadeIn="quarter" style={spinnerStyle} />
    );
  };

  renderBookShelves = () => {
    const { moveBookToShelf, currentlyReading, read, wantToRead } = this.props;

    return (
      <div>
        <Bookshelf
          title="Currently Reading"
          shelfName="currentlyReading"
          books={currentlyReading}
          moveBookToShelf={moveBookToShelf}
        />
        <Bookshelf
          title="Read"
          shelfName="read"
          books={read}
          moveBookToShelf={moveBookToShelf}
        />
        <Bookshelf
          title="Want to Read"
          shelfName="wantToRead"
          books={wantToRead}
          moveBookToShelf={moveBookToShelf}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.props.isLoading
            ? this.renderSpinner()
            : this.renderBookShelves()}
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
  read: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default Home;
