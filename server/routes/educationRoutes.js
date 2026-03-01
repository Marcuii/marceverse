/**
 * @module routes/educationRoutes
 * @description Express routes for the Education resource.
 *
 * Verb   Path    Auth   Upload                Handler
 * GET    /       —      —                     getEducations
 * GET    /:id    —      —                     getEducationById
 * POST   /       Yes    array("images", 10)   createEducation
 * PUT    /:id    Yes    array("images", 10)   updateEducation
 * DELETE /:id    Yes    —                     deleteEducation
 */

const express = require('express');
const router = express.Router();
const {
    getEducations,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation,
} = require('../controllers/educationController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getEducations);
router.get('/:id', getEducationById);
router.post('/', protect, upload.array('images', 10), createEducation);
router.put('/:id', protect, upload.array('images', 10), updateEducation);
router.delete('/:id', protect, deleteEducation);

module.exports = router;