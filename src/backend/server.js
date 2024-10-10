// Require is the keyword used to import modules
// You can import local files by using the relative path

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 3000;
const hostname = "127.0.0.1";

// Middleware
app.use(bodyParser.json())
app.use(cors('*'))
// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/admin", adminRoutes)

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
