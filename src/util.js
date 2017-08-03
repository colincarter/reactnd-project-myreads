export const rawBookToBook = rawBook => {
  return {
    id: rawBook.id,
    title: rawBook.title,
    authors: rawBook.authors || "",
    thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : ""
  };
};

export const spinnerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};
