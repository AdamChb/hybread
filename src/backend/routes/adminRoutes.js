const express = require("express");
const adminController = require("../controllers/adminController"); // Import the combined controller
const authenticateToken = require("../middleware/authMiddleware"); // Import your auth middleware

const router = express.Router();

// admin routes
router.delete("/deletebook/:id", authenticateToken, adminController.deleteBook);
router.post("/addbook", authenticateToken, adminController.addBook);
router.post("/modifybook/:id", authenticateToken, adminController.modifyBook);
router.post("/addbookcover", authenticateToken, adminController.addBookCover);

module.exports = router;