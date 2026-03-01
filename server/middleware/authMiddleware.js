/**
 * @module middleware/authMiddleware
 * @description API-key authentication middleware for admin-only routes.
 *
 * Compares the `x-api-key` request header against the `ADMIN_API_KEY`
 * environment variable using a constant-time comparison to prevent
 * timing-based side-channel attacks.
 */

const crypto = require('crypto');

/**
 * Express middleware that enforces API-key authentication.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const protect = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey) {
        console.error('ADMIN_API_KEY is not set in environment variables!');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    if (!apiKey) {
        return res.status(401).json({ message: 'Not authorized, API key missing' });
    }

    // Constant-time comparison to prevent timing attacks
    const apiKeyBuffer = Buffer.from(apiKey);
    const adminKeyBuffer = Buffer.from(adminKey);

    if (
        apiKeyBuffer.length === adminKeyBuffer.length &&
        crypto.timingSafeEqual(apiKeyBuffer, adminKeyBuffer)
    ) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized, invalid API key' });
    }
};

module.exports = { protect };
