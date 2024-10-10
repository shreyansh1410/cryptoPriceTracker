const cron = require("node-cron");
const cryptoService = require("../services/cryptoService");

// Schedule the task to run every 2 hours
cron.schedule("0 */2 * * *", async () => {
  try {
    await cryptoService.getLatestData("bitcoin");
    await cryptoService.getLatestData("matic-network");
    await cryptoService.getLatestData("ethereum");
    console.log("Fetched and stored latest crypto data");
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
});
