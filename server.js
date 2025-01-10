const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");
const cryptoRoutes = require("./src/routes/cryptoRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
const { fetchCryptoDataOnce } = require("./src/cron/cronjob");


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
