/**
 * @module controllers/generalInfoController
 * @description Handles the singleton GeneralInfo document that stores
 * site-wide configuration (hero image, about section, skills, socials,
 * contact info, CV link, roles, etc.).
 *
 * Because FormData stringifies nested objects, several fields require
 * JSON parsing before persistence.
 */

const GeneralInfo = require('../models/GeneralInfo');
const asyncHandler = require('../middleware/asyncHandler');
const { deleteImageFromCloudinary, parseJsonField } = require('../utils/cloudinaryUtils');

/** @type {string[]} Fields that arrive as JSON strings from multipart FormData. */
const JSON_FIELDS = ['about', 'cv', 'contact', 'socials', 'skills', 'role'];

// @desc    Get general info
// @route   GET /api/general
// @access  Public
const getGeneralInfo = asyncHandler(async (_req, res) => {
    const info = await GeneralInfo.findOne();
    if (!info) {
        return res.status(404).json({ message: 'General Info not found' });
    }
    res.status(200).json(info);
});

// @desc    Update general info (or create if not exists)
// @route   PUT /api/general
// @access  Private (Admin)
const updateGeneralInfo = asyncHandler(async (req, res) => {
    let info = await GeneralInfo.findOne();
    const data = { ...req.body };

    // Parse JSON fields that were stringified by FormData
    for (const field of JSON_FIELDS) {
        if (data[field] !== undefined) {
            data[field] = parseJsonField(data[field]);
        }
    }

    // Handle file uploads
    if (req.files) {
        if (req.files['heroImage']) {
            if (info?.heroImage) {
                await deleteImageFromCloudinary(info.heroImage);
            }
            data.heroImage = req.files['heroImage'][0].path;
        }

        if (req.files['aboutImage']) {
            if (info?.about?.image) {
                await deleteImageFromCloudinary(info.about.image);
            }
            if (!data.about) {
                data.about = info ? info.about?.toObject?.() || { ...info.about } : {};
            }
            data.about.image = req.files['aboutImage'][0].path;
        }
    }

    if (!info) {
        info = await GeneralInfo.create(data);
    } else {
        info = await GeneralInfo.findOneAndUpdate({}, data, {
            new: true,
            runValidators: true,
        });
    }

    res.status(200).json(info);
});

module.exports = {
    getGeneralInfo,
    updateGeneralInfo,
};