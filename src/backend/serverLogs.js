require("dotenv").config();
const mysql = require("mysql2");

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

const serv = { host, user, password, database }

const db = mysql.createConnection(serv);

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

// handle ECONNRESET
db.on("error", (err) => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        db.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Connected to the database");
            }
        });
    } else {
        throw err;
    }
});

module.exports = db;