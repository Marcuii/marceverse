/**
 * @module routes/authRoutes
 * @description Authentication endpoint used by the admin panel.
 *
 * Exposes a single GET route that validates the API key supplied in the
 * `x-api-key` header.  A 200 response confirms the key is valid; the
 * `protect` middleware returns 401 otherwise.
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/** @route GET /api/auth/verify — Verify the admin API key. */
router.get('/verify', protect, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
