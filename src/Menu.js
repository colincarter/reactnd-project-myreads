import React from "react";
import PropTypes from "prop-types";
import { READ, WANT_TO_READ, CURRENTLY_READING, NONE } from "./util";

class Menu extends React.Component {
  onChange = e => {
    this.props.moveBook(this.props.shelfName, e.target.value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.shelfName} onChange={this.onChange}>
          <option value={NONE} disabled>
            Move to...
          </option>
          <option value={CURRENTLY_READING}>Currently Reading</option>
          <option value={WANT_TO_READ}>Want to Read</option>
          <option value={READ}>Read</option>
          <option value={NONE}>None</option>
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
