const fetch = require("node-fetch");
const Crypto = require("../models/crypto");

const COINS = ["bitcoin", "matic-network", "ethereum"];
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

const fetchCryptoData = async (coin) => {
  const url = `${COINGECKO_API_URL}?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      // Removed the API key header
    },
  };

  try {
    const response = await fetch(url, options);
    
    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const coinData = data[coin];

    if (coinData) {
      return {
        coin,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change,
        timestamp: new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching data for ${coin}:`, error.message);
    return null;
  }
};

const saveCryptoData = async (data) => {
  try {
    const crypto = new Crypto(data);
    await crypto.save();
    console.log(`Data saved for ${data.coin}`);
  } catch (error) {
    console.error(`Error saving data for ${data.coin}:`, error.message);
  }
};

const getLatestData = async () => {
  for (const coin of COINS) {
    const data = await fetchCryptoData(coin);
    if (data) {
      await saveCryptoData(data);
    }
  }
};

module.exports = { getLatestData };
