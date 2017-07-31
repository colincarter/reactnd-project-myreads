import React from "react";

const Menu = ({ shelfName }) => {
  const options = [
    { value: "none", html: "Move to..." },
    { value: "currentlyReading", html: "Currently Reading" },
    { value: "wantToRead", html: "Want to Read" },
    { value: "read", html: "Read" },
    { value: "none", html: "None" }
  ];

  return (
    <div className="book-shelf-changer">
      <select defaultValue={shelfName}>
        {options.map((option, index) =>
          <option value={option.value} key={index}>
            {option.html}
          </option>
        )}
        >
      </select>
    </div>
  );
};

export default Menu;
