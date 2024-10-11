const express = require("express");
const chartController = require("../controllers/chartController"); // Import the combined controller
const authenticateToken = require("../middleware/authMiddleware"); // Import your auth middleware

const router = express.Router();

// book routes
router.get("/", authenticateToken, chartController.getChartData);

module.exports = router;