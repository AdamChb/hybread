// Require is the keyword used to import modules
// You can import local files by using the relative path

const express = require("express");
const api_book = require("../database/api_book");
const db = require("../database/start_db");
const init_db = require("../database/init_db");

// Configuration about the server
const hostname = "127.0.0.1";
const port = 3000;

// Create a new instance of express
const server = express();

// When a GET requets is made at the adress /getBook, the server respond (res) with the return of the function getBook

server.get("/getMostLiked", async (req, res) => {
  res.send(await api_book.getMostLiked(10));
});

// The same method exist with POST, PUT and DELETE
// Request body is in req.body, it contains all the data sent by the client in the request body

server.get("/initdb", async (req, res) => {
  await init_db.doAll();
  res.send("Database initialized");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
