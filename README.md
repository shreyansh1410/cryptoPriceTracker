# Cryptocurrency Data Fetching Project

This project is a Node.js application that fetches real-time cryptocurrency data from the CoinGecko API and stores it in a MongoDB database. It uses cron jobs to automate the data fetching process at defined intervals.

## Table of Contents

- Features
- Technologies Used
- Setup and Installation
- Configuration
- Usage
- Cron Jobs
- Deployment
- Contributing
- License

## Features

- Fetches cryptocurrency data (Bitcoin, Matic, Ethereum) from the CoinGecko API.
- Stores the fetched data in a MongoDB database.
- Automated data fetching using cron jobs.
- Detailed error logging for better debugging.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Node-fetch
- Node-cron

## Setup and Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string and any other necessary environment variables.

## Configuration

- Ensure you have a MongoDB database set up and accessible.
- Set up your environment variables in the `.env` file:
  ```
  MONGODB_URI=<your-mongodb-connection-string>
  COINGECKO_API_KEY=<your-api-key-if-required>
  ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The application will begin fetching cryptocurrency data according to the schedule set in the cron job.

## Cron Jobs

The cron job is configured to fetch cryptocurrency data every two hours. You can modify the schedule in the `cronjob.js` file.

## Deployment

https://cryptopricetracker-het5.onrender.com/

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
