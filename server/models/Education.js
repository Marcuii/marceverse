/**
 * @module models/Education
 * @description Mongoose schema for education / academic entries.
 *
 * Follows the same convention as Experience but uses `institution`
 * instead of `company` to better describe the academic context.
 */

const mongoose = require('mongoose');

const educationSchema = mongoose.Schema(
    {
        /** Custom string identifier used for frontend routing. */
        id: { type: String, required: true, unique: true },
        /** Degree or programme name. */
        title: { type: String, required: true },
        /** Name of the educational institution. */
        institution: { type: String, required: true },
        /** Education type (e.g. "Bachelor", "Course"). */
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

module.exports = mongoose.model('Education', educationSchema);
