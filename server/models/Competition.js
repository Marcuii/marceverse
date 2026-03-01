/**
 * @module models/Competition
 * @description Mongoose schema for competition / hackathon entries.
 *
 * Uses `organizer` instead of `company` to describe the event host.
 */

const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema(
    {
        /** Custom string identifier used for frontend routing. */
        id: { type: String, required: true, unique: true },
        /** Competition or event name. */
        title: { type: String, required: true },
        /** Event organiser name. */
        organizer: { type: String, required: true },
        /** Competition type / category. */
        type: { type: String },
        /** Human-readable date range. */
        period: { type: String, required: true },
        /** Card-level summary shown in list views. */
        shortDescription: { type: String, required: true },
        /** Expanded detail view data. */
        details: {
            longDescription: [{ type: String }],
            skills: [{ type: String }],
            /** Cloudinary URLs for detail-page images. */
            images: [{ type: String }],
        },
        /** Sort order controlled by admin drag-and-drop. */
        order: { type: Number, default: 0 },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Competition', competitionSchema);
