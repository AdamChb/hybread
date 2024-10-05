const mysql = require("mysql2");

async function getBook(isbn) {
  const db = mysql.createConnection({
    host: "localhost",
    user: "hybread_root",
    password: "efreihybread240",
    database: "hybread",
  });
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM Book WHERE ISBN = ${isbn}`, (err, results) => {
      db.end();
      if (err) return reject(err);
      return resolve(results);
    });
  });
}

// Export the function getBook
module.exports = { getBook };
