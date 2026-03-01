/**
 * @module controllers/reorderController
 * @description Bulk-reorder endpoint used by the admin drag-and-drop UI.
 *
 * Accepts an array of `{ _id, order }` pairs and persists them atomically
 * via a single `bulkWrite` call, minimising round-trips to MongoDB.
 */

const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const Activity = require('../models/Activity');
const Competition = require('../models/Competition');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

/** @type {Record<string, import('mongoose').Model>} Allowed entity types for reordering. */
const models = {
    projects: Project,
    experience: Experience,
    education: Education,
    certification: Certification,
    activity: Activity,
    competition: Competition,
};

// @desc    Reorder items
// @route   PUT /api/reorder/:type
// @access  Private (Admin)
const reorderItems = asyncHandler(async (req, res) => {
    const { type } = req.params;
    const { items } = req.body;

    // Prevent prototype pollution — only allow known keys
    if (!Object.hasOwn(models, type)) {
        throw new AppError('Invalid resource type', 400);
    }

    if (!Array.isArray(items) || items.length === 0) {
        throw new AppError('Items must be a non-empty array', 400);
    }

    const Model = models[type];

    const bulkOps = items.map((item) => ({
        updateOne: {
            filter: { _id: item._id },
            update: { $set: { order: item.order } },
        },
    }));

    await Model.bulkWrite(bulkOps);

    res.status(200).json({ message: 'Reorder successful' });
});

module.exports = { reorderItems };
