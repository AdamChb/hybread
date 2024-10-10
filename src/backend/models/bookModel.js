const db = require("../serverLogs");

const getBooks = async (callback) => {
    try {
        db.query("SELECT Name_Book, Author, Summary, ID_Category, Id_Book, ISBN FROM Book", 
            (err, books) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, books);
            }
        });
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }
}

const getBooksByCategory = async (categoryId, callback) => {
    try {
        db.query(`SELECT Name_Book, Author, Summary, ID_Category, Id_Book, ISBN FROM Book WHERE ID_Category = ?`,
            [categoryId], 
            (err, books) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, books);
            }
        });
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
}

const getBookCoverById = async (bookId, callback) => {
    try {
        db.query(`SELECT Cover_Book FROM Book WHERE Id_Book = ?`, 
            [bookId],
            (err, cover) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, cover);
            }
        });
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
}

const getBookById = async (bookId, callback) => {
    try {
        db.query(`SELECT Name_Book, Author, Summary, ID_Category, Id_Book, ISBN FROM Book WHERE Id_Book = ${bookId}`, 
            [bookId],
            (err, book) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, book);
            }
        });
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }
}

const getMostLikedBooks = async (callback) => {
    try {
        db.query(`SELECT Id_Book, COUNT(Id_Book) AS count FROM Favourite GROUP BY Id_Book ORDER BY count DESC LIMIT 6`, 
            (err, books) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, books);
            }
        });
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }
}

module.exports = { getBooks, getBookCoverById, getBooksByCategory, getBookById, getMostLikedBooks };