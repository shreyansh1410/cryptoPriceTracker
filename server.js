const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db"); // Import the database config
const cryptoRoutes = require("./src/routes/cryptoRoutes"); // Import routes
const errorHandler = require("./src/middlewares/errorHandler"); // Import error handling middleware
const { fetchCryptoDataOnce } = require("./src/cron/cronjob");

dotenv.config();

const app = express();
connectDB(); // Connect to MongoDB

app.use(express.json());
app.use("/api", cryptoRoutes); // Use crypto routes
app.use(errorHandler); // Use error handling middleware

fetchCryptoDataOnce();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
