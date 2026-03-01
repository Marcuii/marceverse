/**
 * @module api/index
 * @description Vercel Serverless Function entry point.
 *
 * Lazily connects to MongoDB on the first cold-start invocation, then
 * delegates every request to the Express app exported from `../app.js`.
 *
 * Mongoose caches the connection across warm invocations automatically,
 * so subsequent requests reuse the same connection pool.
 */

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const app = require('../app');

/** @type {Promise<void>|null} Cached DB connection promise. */
let dbPromise = null;

module.exports = async (req, res) => {
    if (!dbPromise) {
        dbPromise = connectDB();
    }
    await dbPromise;
    return app(req, res);
};
