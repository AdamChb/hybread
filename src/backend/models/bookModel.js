const db = require("../serverLogs");

const getBooks = async (limit, callback) => {
    try {
        db.query(
            `SELECT Id_Book
            FROM Book
            ORDER BY RAND()
            LIMIT ?`, 
            [limit],
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
        db.query(`SELECT Id_Book FROM Book WHERE ID_Category = ? ORDER BY RAND() LIMIT 20`,
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

const getBookById = async (info, callback) => {
    try {
        db.query(
            `SELECT 
                b.Id_Book,
                b.ISBN,
                b.Name_Book,
                b.Author,
                b.Summary,
                b.Cover_Book,
                b.Stock,
                b.ID_Category,
                c.Name_Category,
                COUNT(f.ID_Reader) AS Total_Likes,
                CASE
                    WHEN f2.ID_Reader IS NOT NULL THEN 1
                    ELSE 0
                END AS Has_Liked
            FROM 
                Book b
            JOIN 
                Category c ON b.ID_Category = c.ID_Category
            LEFT JOIN 
                Favourite f ON b.ID_Book = f.ID_Book
            LEFT JOIN 
                Favourite f2 ON b.ID_Book = f2.ID_Book AND f2.ID_Reader = ?
            WHERE 
                b.Id_Book = ?
            GROUP BY 
                b.Id_Book, b.ISBN, b.Name_Book, b.Author, b.Summary, b.Cover_Book, b.Stock, b.ID_Category, c.Name_Category, f2.ID_Reader;`, 
            [info.ID_Reader, info.ID_Book],
            (err, book) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                book[0].Cover_Book = book[0].Cover_Book.toString("base64")
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