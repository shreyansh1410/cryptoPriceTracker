const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import the database config
const cryptoRoutes = require("./routes/cryptoRoutes"); // Import routes
const errorHandler = require("./middlewares/errorHandler"); // Import error handling middleware
const { fetchCryptoDataOnce } = require("./cron/cronjob");

dotenv.config();

const app = express();
connectDB(); // Connect to MongoDB

app.use(express.json());
app.use("/api", cryptoRoutes); // Use crypto routes
app.use(errorHandler); // Use error handling middleware

fetchCryptoDataOnce();

const PORT = process.env.PORT || 5000;

app.get("/ping", (req, res) => {
  res.status(200).send("Server is active");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
