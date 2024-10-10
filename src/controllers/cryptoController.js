const Crypto = require("../models/crypto");
const cryptoService = require("../services/cryptoService");

const getLatestData = async (req, res) => {
  try {
    await cryptoService.getLatestData();
    res.status(200).json({ message: "Crypto data updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  const { coin } = req.query;

  try {
    const data = await Crypto.findOne({ coin });
    if (!data) return res.status(404).json({ message: "Coin not found." });

    res.status(200).json({
      price: data.price,
      marketCap: data.marketCap,
      change24h: data.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStandardDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    const prices = records.map(record => record.price);
    
    if (prices.length < 2) return res.status(400).json({ message: "Not enough data to calculate deviation." });

    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLatestData,
  getStats,
  getStandardDeviation,
};
