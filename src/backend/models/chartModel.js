const db = require("../serverLogs");

const getChartData = (user, callback) => {
    db.query(
        `SELECT 
            c.ID_Category,
            COUNT(f.ID_Book) AS Number_of_Liked_Books
        FROM 
            Category c
        LEFT JOIN 
            Book b ON c.ID_Category = b.ID_Category
        LEFT JOIN 
            Favourite f ON b.ID_Book = f.ID_Book AND f.ID_Reader = 1
        GROUP BY 
            c.Name_Category
        ORDER BY
            c.ID_Category;`,
        [user.id],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}


module.exports = { getChartData }
