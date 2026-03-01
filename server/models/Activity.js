/**
 * @module models/Activity
 * @description Mongoose schema for extracurricular / volunteer activities.
 *
 * Uses `organization` instead of `company` to describe the hosting body.
 */

const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
    {
        /** Custom string identifier used for frontend routing. */
        id: { type: String, required: true, unique: true },
        /** Activity or role name. */
        title: { type: String, required: true },
        /** Hosting organisation name. */
        organization: { type: String, required: true },
        /** Activity type / category. */
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

module.exports = mongoose.model('Activity', activitySchema);
