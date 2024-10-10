const db = require("../serverLogs");

const deleteBook = async (info, callback) => {
    try {
        db.query(
            `DELETE FROM Book WHERE Id_Book = ?`,
            [info.bookId],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        )
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
};

const modifyBook = async (info, callback) => {
    try {
        db.query(
            `UPDATE Book SET Name_Book = ?, Author = ?, Summary = ?, ID_Category = ?, ISBN = ? WHERE Id_Book = ?`,
            [info.Name_Book, info.Author, info.Summary, info.ID_Category, info.ISBN, info.ID_Book],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        )
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
};

const addBook = async (info, callback) => {
    try {
        db.query(
            `INSERT INTO Book(Name_Book, Author, Summary, ID_Category, ISBN) VALUES (?,?,?,?,?)`,
            [info.Name_Book, info.Author, info.Summary, info.ID_Category, info.ISBN],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        )
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
};


module.exports = { deleteBook, modifyBook, addBook }
