const mysql = require("mysql2");
const serv = require("../serverLogs");

// Find User by Email
const findUserByEmail = (email, callback) => {
    const db = mysql.createConnection(serv);
    db.query(
        `SELECT * FROM Reader WHERE Email = ?`,
        [email],
        (err, results) => {
            db.end();
            if (err) return callback(err, null);
            callback(null, results[0]);
        }
    )
}

// Find User by ID
const findUserById = (id, callback) => {
    const db = mysql.createConnection(serv);
    db.query(
        `SELECT * FROM Reader WHERE ID_Reader = ?`,
        [id],
        (err, results) => {
            db.end();
            if (err) return callback(err, null);
            callback(null, results[0]);
        }
    )
}

// Create User 
const createUser = (user, callback) => {
    const db = mysql.createConnection(serv);
    db.query(
        `INSERT INTO Reader(Pseudo, Email, Password) VALUES (?,?,?)`,
        [user.username, user.email, user.password],
        (err, results) => {
            db.end();
            if (err) return callback(err, null);
            callback(null, results);
        }
    )
}

module.exports = { findUserByEmail, findUserById, createUser }
