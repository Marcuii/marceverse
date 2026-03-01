/**
 * @module routes/reorderRoutes
 * @description Drag-and-drop reorder endpoint consumed by the admin panel.
 *
 * Verb   Path     Auth   Handler
 * PUT    /:type   Yes    reorderItems
 */

const express = require('express');
const router = express.Router();
const { reorderItems } = require('../controllers/reorderController');
const { protect } = require('../middleware/authMiddleware');

router.put('/:type', protect, reorderItems);

module.exports = router;
