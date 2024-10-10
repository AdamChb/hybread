const express = require("express");
const adminController = require("../controllers/adminController"); // Import the combined controller
const authenticateToken = require("../middleware/authMiddleware"); // Import your auth middleware

const router = express.Router();

// admin routes
router.delete("/deletebook/:id", authenticateToken, adminController.deleteBook);
router.post("/addbook", authenticateToken, adminController.addBook);
router.put("/updatebook/:id", authenticateToken, adminController.updateBook);

module.exports = router;