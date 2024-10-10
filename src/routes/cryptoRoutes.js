const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

router.get("/stats", cryptoController.getStats);
router.get("/deviation", cryptoController.getStandardDeviation);
router.post("/update", cryptoController.getLatestData); // Or any method for triggering data fetch

module.exports = router;
