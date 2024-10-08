// Database connection
const db = require("./start_db").db;

async function getBook(isbn) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM Book WHERE ISBN = ${isbn}`, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
}

async function getMostLiked(limit) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Book ORDER BY Likes DESC LIMIT ${limit}`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function insertBook(book) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO Book (Name_Book, Author, Summary, ISBN, Cover_Book, Id_Category) VALUES (?, ?, ?, ?, ?, ?)",
      [
        book.title,
        book.author,
        book.description,
        book.isbn,
        book.cover,
        book.category,
      ],
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function updateNameBook(id, name) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Book SET Name_Book = '${name}' WHERE Id_Book = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function updateIsbnBook(id, isbn) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM Book WHERE ISBN = ${isbn}`, (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) return reject("ISBN already exists");
    });
    db.query(`UPDATE Book SET ISBN = ${isbn} WHERE Id_Book = ${id}`, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

async function updateLikesBook(id, likes) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Book SET Likes = ${likes} WHERE Id_Book = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function updateCoverBook(id, cover) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Book SET Cover_Book = '${cover}' WHERE Id_Book = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function updateSummaryBook(id, summary) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Book SET Summary = '${summary}' WHERE Id_Book = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function updateAuthorBook(id, author) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Book SET Author = '${author}' WHERE Id_Book = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function updateCategoryBook(id, category) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Book SET Id_Category = ${category} WHERE Id_Book = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function deleteBook(id) {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM Book WHERE Id_Book = ${id}`, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

async function getCover(coverId) {
  // API link to get the cover
  const linkCover = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

  // Get the cover image as a buffer
  return await fetch(linkCover).then(async (response) =>
    Buffer.from(await response.arrayBuffer())
  );
}

// Export the function getBook
module.exports = {
  getBook,
  getMostLiked,
  insertBook,
  updateNameBook,
  updateIsbnBook,
  updateLikesBook,
  updateCoverBook,
  updateSummaryBook,
  updateAuthorBook,
  updateCategoryBook,
  deleteBook,
  getCover,
};
