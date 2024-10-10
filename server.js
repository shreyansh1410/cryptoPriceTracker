// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/cryptoRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', cryptoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
