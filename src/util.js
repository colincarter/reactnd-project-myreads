export const rawBookToBook = rawBook => {
  return {
    id: rawBook.id,
    title: rawBook.title,
    authors: rawBook.authors || "",
    thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : ""
  };
};

const shelfNames = ["read", "wantToRead", "currentlyReading", "none"];

export const findShelf = (bookToFind, props) => {
  for (let shelf of shelfNames) {
    if (props[shelf].find(book => book.id === bookToFind.id)) {
      return shelf;
    }
  }
  return null;
};

export const spinnerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};
