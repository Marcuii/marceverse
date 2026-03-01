/**
 * @module routes/experienceRoutes
 * @description Express routes for the Experience resource.
 *
 * Verb   Path    Auth   Upload                Handler
 * GET    /       —      —                     getExperiences
 * GET    /:id    —      —                     getExperienceById
 * POST   /       Yes    array("images", 10)   createExperience
 * PUT    /:id    Yes    array("images", 10)   updateExperience
 * DELETE /:id    Yes    —                     deleteExperience
 */

const express = require('express');
const router = express.Router();
const {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
} = require('../controllers/experienceController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getExperiences);
router.get('/:id', getExperienceById);
router.post('/', protect, upload.array('images', 10), createExperience);
router.put('/:id', protect, upload.array('images', 10), updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
