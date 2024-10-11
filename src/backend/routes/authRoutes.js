const express = require("express");
const userController = require("../controllers/userController"); // Import the combined controller
const authenticateToken = require("../middleware/authMiddleware"); // Import your auth middleware

const router = express.Router();

// user routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", authenticateToken, userController.getUserProfile); // Protect the profile route
router.get("/likedbooks", authenticateToken, userController.getLikedBooks);
router.post("/likebook", authenticateToken, userController.likeBook);
router.delete("/unlikebook", authenticateToken, userController.unlikeBook);
router.post("/updatepassword", authenticateToken, userController.updatePassword);
router.post("/updateemail", authenticateToken, userController.updateEmail);

module.exports = router;
