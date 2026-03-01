/**
 * @module routes/generalInfoRoutes
 * @description Express routes for the singleton GeneralInfo resource.
 *
 * Verb   Path   Auth   Upload                               Handler
 * GET    /      —      —                                    getGeneralInfo
 * PUT    /      Yes    fields(heroImage, aboutImage)         updateGeneralInfo
 */

const express = require('express');
const router = express.Router();
const {
    getGeneralInfo,
    updateGeneralInfo,
} = require('../controllers/generalInfoController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getGeneralInfo);
router.put('/', protect, upload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'aboutImage', maxCount: 1 }]), updateGeneralInfo);

module.exports = router;