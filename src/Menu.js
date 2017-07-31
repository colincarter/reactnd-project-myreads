import React from "react";
import PropTypes from "prop-types";

class Menu extends React.Component {
  onChange = e => {
    if (e.target.value !== this.props.shelfName) {
      this.props.moveBook(this.props.shelfName, e.target.value);
    }
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.props.shelfName} onChange={this.onChange}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

Menu.propTypes = {
  shelfName: PropTypes.string.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Menu;
