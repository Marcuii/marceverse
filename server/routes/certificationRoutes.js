/**
 * @module routes/certificationRoutes
 * @description Express routes for the Certification resource.
 *
 * Verb   Path    Auth   Upload                Handler
 * GET    /       —      —                     getCertifications
 * GET    /:id    —      —                     getCertificationById
 * POST   /       Yes    array("images", 10)   createCertification
 * PUT    /:id    Yes    array("images", 10)   updateCertification
 * DELETE /:id    Yes    —                     deleteCertification
 */

const express = require('express');
const router = express.Router();
const {
    getCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
} = require('../controllers/certificationController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getCertifications);
router.get('/:id', getCertificationById);
router.post('/', protect, upload.array('images', 10), createCertification);
router.put('/:id', protect, upload.array('images', 10), updateCertification);
router.delete('/:id', protect, deleteCertification);

module.exports = router;