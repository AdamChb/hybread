const express = require("express");
const bookController = require("../controllers/bookController"); // Import the combined controller

const router = express.Router();

// book routes
router.get("/cover/:id", bookController.getBookCoverById);
router.get("/book/:userId/:bookId", bookController.getBookById);
router.get("/category/:category", bookController.getBooksByCategory);
router.get("/top", bookController.getTopBooks);
router.get("/:limit", bookController.getBooks);

module.exports = router;