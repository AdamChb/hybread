const db = require("../serverLogs");

const getCategoryById = async (categoryID, callback) => {
    try {
        db.query("SELECT * FROM Category WHERE ID_Category = ?", 
            [categoryID],
            (err, categories) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, categories);
            }
        });
    } catch (err) {
        console.log(err);
        callback(err, null);
    }   
}

const getCategories = async (callback) => {
    try {
        db.query("SELECT * FROM Category", 
            (err, categories) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                callback(null, categories);
            }
        });
    } catch (err) {
        console.log(err);
        callback(err, null);
    }   
}


module.exports = { getCategoryById, getCategories };
