const express = require("express");
const categoryController = require("../controllers/categoryController"); // Import the combined controller

const router = express.Router();

// book routes
router.get("/getcategory/:id", categoryController.getCategoryById);
router.get("/getcategories", categoryController.getCategories);

module.exports = router;