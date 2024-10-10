const cron = require("node-cron");
const cryptoService = require("../services/cryptoService");

const scheduleCryptoFetch = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Fetching crypto data...");
    await cryptoService.getLatestData();
  });
};

const fetchCryptoDataOnce = async () => {
  console.log("Instantly fetching crypto data...");
  await cryptoService.getLatestData();
};

module.exports = { scheduleCryptoFetch, fetchCryptoDataOnce };
