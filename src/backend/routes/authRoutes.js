const express = require("express");
const userController = require("../controllers/userController"); // Import the combined controller
const authenticateToken = require("../middleware/authMiddleware"); // Import your auth middleware

const router = express.Router();

// Define the routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", authenticateToken, userController.getUserProfile); // Protect the profile route

module.exports = router;
