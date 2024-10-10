const express = require('express');
const router = express.Router();
const cryptoService = require('../services/cryptoService');

// Get stats for a specific cryptocurrency
router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await cryptoService.getLatestData(coin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get standard deviation of prices for a specific cryptocurrency
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  try {
    const deviation = await cryptoService.calculateStandardDeviation(coin);
    res.json({ standardDeviation: deviation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
