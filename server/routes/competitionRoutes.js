/**
 * @module routes/competitionRoutes
 * @description Express routes for the Competition resource.
 *
 * Verb   Path    Auth   Upload                Handler
 * GET    /       —      —                     getCompetitions
 * GET    /:id    —      —                     getCompetitionById
 * POST   /       Yes    array("images", 10)   createCompetition
 * PUT    /:id    Yes    array("images", 10)   updateCompetition
 * DELETE /:id    Yes    —                     deleteCompetition
 */

const express = require('express');
const router = express.Router();
const {
    getCompetitions,
    getCompetitionById,
    createCompetition,
    updateCompetition,
    deleteCompetition,
} = require('../controllers/competitionController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getCompetitions);
router.get('/:id', getCompetitionById);
router.post('/', protect, upload.array('images', 10), createCompetition);
router.put('/:id', protect, upload.array('images', 10), updateCompetition);
router.delete('/:id', protect, deleteCompetition);

module.exports = router;