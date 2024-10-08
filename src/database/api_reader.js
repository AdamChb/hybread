async function insertUser(pseudo, email, password, admin = false) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Reader WHERE Pseudo = '${pseudo}' OR Email = '${email}'`,
      (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) return reject("User already exists");
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return reject(err);
          db.query(
            `INSERT INTO Reader (Pseudo, Email, Password, Admin) VALUES ('${pseudo}', '${email}', '${hash}', ${admin})`,
            (err) => {
              if (err) return reject(err);
              return resolve();
            }
          );
        });
      }
    );
  });
}

async function getUser(userrname, password) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Reader WHERE Pseudo = '${userrname}'`,
      (err, results) => {
        if (err) return reject(err);
        if (results.length == 0) return reject("User not found");
        bcrypt.compare(password, results[0].Password, (err, res) => {
          if (err) return reject(err);
          if (res) return resolve(results[0]);
          return reject("Wrong password");
        });
      }
    );
  });
}

async function updatePseudo(id, pseudo) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT Id_User FROM Reader WHERE Pseudo = ${pseudo}`,
      (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) return reject("Pseudo already exists");
        db.query(
          `UPDATE Reader SET Pseudo = '${pseudo}' WHERE Id_User = ${id}`,
          (err) => {
            if (err) return reject(err);
            return resolve();
          }
        );
      }
    );
  });
}

async function updatePassword(id, password) {
  password = await bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE User SET Password = '${hash}' WHERE Id_User = ${id}`,
        (err) => {
          if (err) return reject(err);
          return resolve();
        }
      );
    });
  });
}

module.exports = { insertUser, getUser, updatePseudo, updatePassword };
