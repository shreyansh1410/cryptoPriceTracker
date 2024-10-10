const Crypto = require("../models/crypto");

// Get latest cryptocurrency stats
exports.getStats = async (req, res) => {
  const { coin } = req.query;

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ date: -1 });
    if (!latestData) {
      return res
        .status(404)
        .json({ message: "No data found for this cryptocurrency" });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get standard deviation for a cryptocurrency price
exports.getDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    const cryptoData = await Crypto.find({ coin })
      .sort({ date: -1 })
      .limit(100);
    if (cryptoData.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough data to calculate deviation" });
    }

    const prices = cryptoData.map((data) => data.price);

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const stdDev = Math.sqrt(variance);

    res.json({ standardDeviation: stdDev });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
