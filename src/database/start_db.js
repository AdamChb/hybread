mysql = require("mysql2");

// Database connection
var db = mysql.createConnection({
  host: "concordia-db.docsystem.xyz",
  user: "uml-b-3",
  password: "FSZFcNnSUwexhzXqfwO7oxHbJmYQteF9",
  database: "web-b-3",
});

module.exports = { db };
