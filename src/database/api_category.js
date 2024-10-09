const db = require("./start_db").db;

async function insertCategory(name) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO Category (Name) VALUES ('${name}')`, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

async function updateCategory(id, name) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Category WHERE Name = '${name}'`,
      (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) return reject("Category already exists");
      }
    );
    db.query(
      `UPDATE Category SET Name = '${name}' WHERE Id_Category = ${id}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

module.exports = { insertCategory, updateCategory };
