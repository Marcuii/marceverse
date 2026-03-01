/**
 * @module routes/projectRoutes
 * @description Express routes for the Project resource.
 *
 * Verb   Path         Auth   Upload               Handler
 * GET    /            —      —                    getProjects
 * POST   /            Yes    single("image")       createProject
 * PUT    /:id         Yes    single("image")       updateProject
 * DELETE /:id         Yes    —                    deleteProject
 */

const express = require('express');
const router = express.Router();
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.post('/', protect, upload.single('image'), createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

