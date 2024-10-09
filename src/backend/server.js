// Require is the keyword used to import modules
// You can import local files by using the relative path

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;
const hostname = "127.0.0.1";

// Middleware
app.use(bodyParser.json())
app.use(cors('*'))
// Use the auth routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});

// Close the database connection gracefully on exit
process.on("SIGINT", () => {
  require("./controllers/userController").closeConnection((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
    }
    process.exit(0);
  })
});



// const init_db = require("../database/init_db");
// const api_book = require("../database/api_book");
// const api_account = require("../database/api_account");

// Get the 10 most liked books
// server.get("/getMostLiked", async (req, res) => {
//   res.send(await api_book.getMostLiked(10));
// });

// // Register a new user
// server.post("/api/new-user", async (req, res) => {
//   const user = req.body;
//   try {
//     const result = await api_account.signUp(user);
//     res.send(result);
//   } catch (error) {
//     res.send(error);
//   }
// });

// // Log in a user
// server.post("/api/log-in", async (req, res) => {
//   const info = req.body;
//   try {
//     const result = await api_account.logIn(info);
//     res.send(result);
//   } catch (error) {
//     res.send(error);
//   }
// });
