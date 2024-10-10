const cron = require("node-cron");
const cryptoService = require("../services/cryptoService");

const scheduleCryptoFetch = () => {
  cron.schedule("0 */2 * * *", async () => {
    console.log("Fetching crypto data...");
    await cryptoService.getLatestData();
  });
};

const fetchCryptoDataOnce = async () => {
  console.log("Instantly fetching crypto data...");
  await cryptoService.getLatestData();
};

module.exports = { scheduleCryptoFetch, fetchCryptoDataOnce };
