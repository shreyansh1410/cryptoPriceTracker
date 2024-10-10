const axios = require("axios");
const Crypto = require("../models/crypto");

// Fetch data
const fetchLatestCryptoData = async (coin) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  const response = await axios.get(url);
  return response.data[coin];
};

// Get latest data and store in DB
const getLatestData = async (coin) => {
  const latestData = await fetchLatestCryptoData(coin);
  const cryptoData = new Crypto({
    coin: coin,
    price: latestData.usd,
    marketCap: latestData.usd_market_cap,
    change24h: latestData.usd_24h_change,
  });
  await cryptoData.save();
  return cryptoData;
};

// Standard Deviation
const calculateStandardDeviation = async (coin) => {
  const records = await Crypto.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100);
  const prices = records.map((record) => record.price);

  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const squaredDiffs = prices.map((price) => (price - mean) ** 2);
  const variance =
    squaredDiffs.reduce((a, b) => a + b, 0) / squaredDiffs.length;

  return Math.sqrt(variance);
};

module.exports = { getLatestData, calculateStandardDeviation };
