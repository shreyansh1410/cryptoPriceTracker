const express = require("express");
const mongoose = require("mongoose");
const cryptoRoutes = require("./routes/cryptoRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use("/api", cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
