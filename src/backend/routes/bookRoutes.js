const express = require("express");
const bookController = require("../controllers/bookController"); // Import the combined controller

const router = express.Router();

// book routes
router.get("/", bookController.getBooks);
router.get("/cover/:id", bookController.getBookCoverById);
router.get("/book/:id", bookController.getBookById);
router.get("/top", bookController.getTopBooks);

module.exports = router;