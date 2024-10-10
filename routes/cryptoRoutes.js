const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController.js");

// Route to get the latest stats for a specific cryptocurrency
router.get("/stats", cryptoController.getStats);

// Route to get the standard deviation of the price for a cryptocurrency
router.get("/deviation", cryptoController.getDeviation);

module.exports = router;
