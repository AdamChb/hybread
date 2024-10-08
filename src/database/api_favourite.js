async function addFavourite(id_user, id_book) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO Favourite (Id_User, Id_Book) VALUES (${id_user}, ${id_book})`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function removeFavourite(id_user, id_book) {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM Favourite WHERE Id_User = ${id_user} AND Id_Book = ${id_book}`,
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

async function getFavourites(id_user) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Favourite WHERE Id_User = ${id_user}`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

async function countFavourites(id_book) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) FROM Favourite WHERE Id_Book = ${id_book}`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]["COUNT(*)"]);
      }
    );
  });
}

module.exports = {
  addFavourite,
  removeFavourite,
  getFavourites,
  countFavourites,
};
