export const rawBookToBook = rawBook => {
  return {
    id: rawBook.id,
    title: rawBook.title,
    authors: rawBook.authors || "",
    thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : ""
  };
};
