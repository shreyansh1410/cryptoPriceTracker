const axios = require("axios");
const Crypto = require("../models/crypto"); // Your Mongoose model

const getLatestData = async (coin) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );
    const {
      usd: price,
      usd_market_cap: marketCap,
      usd_24h_change: change24h,
    } = response.data[coin];

    // Store the data in the MongoDB collection
    const cryptoData = new Crypto({
      coin,
      price,
      marketCap,
      change24h,
    });

    await cryptoData.save();
    console.log(`Saved data for ${coin}`);
  } catch (error) {
    console.error(`Error fetching data for ${coin}:`, error.message);
  }
};

module.exports = { getLatestData };
