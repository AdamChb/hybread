mysql = require("mysql2");

// Database connection
var db = mysql.createConnection({
  host: "localhost",
  user: "hybread_root",
  password: "efreihybread240",
  database: "hybread",
});

module.exports = { db };
