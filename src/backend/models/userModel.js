const db = require("../serverLogs");

// Find User by Email
const findUserByEmail = (email, callback) => {
    db.query(
        `SELECT * FROM Reader WHERE Email = ?`,
        [email],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        }
    )
}

// Find User by ID
const findUserById = (id, callback) => {
    db.query(
        `SELECT * FROM Reader WHERE ID_Reader = ?`,
        [id],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        }
    )
}

// Create User 
const createUser = (user, callback) => {
    db.query(
        `INSERT INTO Reader(Pseudo, Email, Password) VALUES (?,?,?)`,
        [user.username, user.email, user.password],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    )
}

const getLikedBooks = async (userId, callback) => {
    try {
        db.query(
            `SELECT ID_Book FROM Book WHERE ID_Book IN (SELECT ID_Book FROM Favourite WHERE ID_Reader = ?)`,
            [userId],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        )
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
}

const likeBook = async (info, callback) => {
    try {
        db.query(
            `INSERT INTO Favourite(ID_Reader, ID_Book) VALUES (?,?)`,
            [info.userId, info.bookId],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        )
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
}

const unlikeBook = async (info, callback) => {
    try {
        db.query(
            `DELETE FROM Favourite WHERE ID_Reader = ? AND ID_Book = ?`,
            [info.userId, info.bookId],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        )
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
}


module.exports = { findUserByEmail, findUserById, createUser, getLikedBooks, likeBook, unlikeBook }
