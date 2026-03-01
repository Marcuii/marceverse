/**
 * @module routes/activityRoutes
 * @description Express routes for the Activity resource.
 *
 * Verb   Path    Auth   Upload                Handler
 * GET    /       —      —                     getActivitys
 * GET    /:id    —      —                     getActivityById
 * POST   /       Yes    array("images", 10)   createActivity
 * PUT    /:id    Yes    array("images", 10)   updateActivity
 * DELETE /:id    Yes    —                     deleteActivity
 */

const express = require('express');
const router = express.Router();
const {
    getActivitys,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
} = require('../controllers/activityController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getActivitys);
router.get('/:id', getActivityById);
router.post('/', protect, upload.array('images', 10), createActivity);
router.put('/:id', protect, upload.array('images', 10), updateActivity);
router.delete('/:id', protect, deleteActivity);

module.exports = router;