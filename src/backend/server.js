// Require is the keyword used to import modules
// You can import local files by using the relative path

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chartRoutes = require("./routes/chartRoutes");

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
app.use("/api/chart", chartRoutes)

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'dossier_destination/'); // Remplacez par votre dossier de destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ajoutez un horodatage au nom du fichier
  },
});

const upload = multer({ storage });

// Endpoint pour télécharger le fichier
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).send('Fichier téléchargé avec succès !');
});

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
