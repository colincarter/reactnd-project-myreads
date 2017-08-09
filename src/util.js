/**
 * Convert a rawbook from the api to a smaller/flatter book object
 * @param {object} rawBook 
 */
export const rawBookToBook = rawBook => {
  return {
    id: rawBook.id,
    title: rawBook.title,
    authors: rawBook.authors || "",
    thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : ""
  };
};

export const READ = "read";
export const WANT_TO_READ = "wantToRead";
export const CURRENTLY_READING = "currentlyReading";
export const NONE = "none";

const shelfNames = [READ, WANT_TO_READ, CURRENTLY_READING, NONE];

/**
 * Find the shelf a book resides in.
 * @param {object} bookToFind 
 * @param {object} props 
 * @returns {object} shelfName or null if the book is not in a shelf
 */
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
