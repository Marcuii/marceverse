/**
 * @module server
 * @description Local development entry point for the MarceVerse API.
 *
 * Connects to MongoDB and starts the Express HTTP server.
 * In production (Vercel), requests are handled by `api/index.js` instead.
 */

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

/**
 * Initialise the database connection and start listening for HTTP requests.
 * Exits the process on fatal startup errors.
 */
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

// ─── Process Error Handlers ─────────────────────────────────────────────────
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
