/**
 * @module config/db
 * @description Establishes the MongoDB connection via Mongoose.
 *
 * Reads `MONGO_URI` from environment variables.  Terminates the process on
 * connection failure so the orchestrator (PM2, Docker, etc.) can restart it.
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI defined in `process.env.MONGO_URI`.
 *
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Exits the process with code 1 if the connection fails.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
