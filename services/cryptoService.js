const axios = require('axios');
const Crypto = require('../models/crypto');

// Function to fetch latest data from CoinGecko
const fetchLatestCryptoData = async (coin) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  const response = await axios.get(url);
  return response.data[coin];
};

// Function to get latest data and store in the database
const getLatestData = async (coin) => {
  const latestData = await fetchLatestCryptoData(coin);
  const cryptoData = new Crypto({
    coin: coin,
    price: latestData.usd,
    marketCap: latestData.usd_market_cap,
    change24h: latestData.usd_24h_change
  });
  await cryptoData.save();
  return cryptoData;
};

// Function to calculate standard deviation of the last 100 records
const calculateStandardDeviation = async (coin) => {
  const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  const prices = records.map(record => record.price);
  
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const squaredDiffs = prices.map(price => (price - mean) ** 2);
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / squaredDiffs.length;
  
  return Math.sqrt(variance);
};

module.exports = { getLatestData, calculateStandardDeviation };
