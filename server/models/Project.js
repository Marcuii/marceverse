/**
 * @module models/Project
 * @description Mongoose schema for portfolio projects.
 *
 * Each project has a single cover image stored in Cloudinary, a set of
 * technology tags, optional demo/repo links, and an `order` field for
 * admin-controlled display sequencing.
 */

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        /** Display name of the project. */
        name: { type: String, required: true },
        /** Short project summary. */
        description: { type: String, required: true },
        /** Optional grouping category (e.g. "Web", "Mobile"). */
        category: { type: String },
        /** Cloudinary URL for the project cover image. */
        image: { type: String, required: true },
        /** Technology / framework tags shown as chips. */
        tags: [{ type: String }],
        /** Source-code repository URL. */
        repo: { type: String, required: true },
        /** Live demo URL (optional). */
        demo: { type: String },
        /** Sort order controlled by admin drag-and-drop. */
        order: { type: Number, default: 0 },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Project', projectSchema);
