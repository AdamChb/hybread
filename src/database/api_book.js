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

// Export the function getBook
module.exports = {
  getBook,
  insertBook,
  updateNameBook,
  updateIsbnBook,
  updateCoverBook,
  updateSummaryBook,
  updateAuthorBook,
  updateCategoryBook,
  deleteBook,
};
