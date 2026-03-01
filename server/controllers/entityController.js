/**
 * @module controllers/entityController
 * @description Factory that produces a full set of CRUD controller functions
 * for any entity model that follows the multi-image, custom-id convention.
 *
 * Consumed by: Experience, Education, Certification, Activity, Competition.
 * Projects and GeneralInfo use dedicated controllers because their schema
 * differs (single image, different ID strategy, etc.).
 */

const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const {
    deleteImageFromCloudinary,
    deleteImagesFromCloudinary,
    parseJsonField,
} = require('../utils/cloudinaryUtils');

/**
 * Creates a set of CRUD controller functions for an entity model that uses:
 *   - A custom string `id` field (not MongoDB's _id)
 *   - A `details` object with an `images` array (multi-image upload)
 *   - An `order` field for sorting
 *
 * @param {import('mongoose').Model} Model - Mongoose model
 * @param {string} entityName - Human-readable name for error messages (e.g. "Experience")
 */
const createEntityController = (Model, entityName) => {
    /** @desc Get all items, sorted by `order` ascending. */
    // GET /
    const getAll = asyncHandler(async (_req, res) => {
        const items = await Model.find().sort({ order: 1 });
        res.status(200).json(items);
    });

    /** @desc Get a single item by its custom string `id`. */
    // GET /:id
    const getById = asyncHandler(async (req, res) => {
        const item = await Model.findOne({ id: req.params.id });
        if (!item) {
            throw new AppError(`${entityName} not found`, 404);
        }
        res.status(200).json(item);
    });

    /** @desc Create a new item with optional multi-image upload. */
    // POST /
    const create = asyncHandler(async (req, res) => {
        let details = parseJsonField(req.body.details);

        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map((file) => file.path);
            if (!details) details = {};
            if (!details.images) details.images = [];
            details.images = [...details.images, ...imageUrls];
        }

        const item = await Model.create({
            ...req.body,
            details,
        });

        res.status(201).json(item);
    });

    /**
     * @desc Update an existing item.
     * Handles image diffing — deletes removed images from Cloudinary,
     * keeps existing ones, and appends newly uploaded files.
     */
    // PUT /:id
    const update = asyncHandler(async (req, res) => {
        const item = await Model.findOne({ id: req.params.id });
        if (!item) {
            throw new AppError(`${entityName} not found`, 404);
        }

        let details = parseJsonField(req.body.details);

        // Determine which images were removed vs kept
        const oldImages = item.details?.images || [];
        const keptImages = details?.images || [];
        const imagesToDelete = oldImages.filter((img) => !keptImages.includes(img));

        // Delete removed images in parallel
        await deleteImagesFromCloudinary(imagesToDelete);

        // Merge in newly uploaded images
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map((file) => file.path);
            if (!details) details = {};
            if (!details.images) details.images = keptImages;
            details.images = [...details.images, ...newImageUrls];
        } else {
            if (!details) details = {};
            details.images = keptImages;
        }

        const updatedItem = await Model.findOneAndUpdate(
            { id: req.params.id },
            { ...req.body, details },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedItem);
    });

    /** @desc Delete an item and all of its Cloudinary images. */
    // DELETE /:id
    const remove = asyncHandler(async (req, res) => {
        const item = await Model.findOne({ id: req.params.id });
        if (!item) {
            throw new AppError(`${entityName} not found`, 404);
        }

        // Delete all associated images in parallel
        await deleteImagesFromCloudinary(item.details?.images);

        await item.deleteOne();
        res.status(200).json({ id: req.params.id });
    });

    return { getAll, getById, create, update, remove };
};

module.exports = createEntityController;
