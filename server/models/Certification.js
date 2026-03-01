/**
 * @module models/Certification
 * @description Mongoose schema for professional certifications.
 *
 * Uses `issuer` instead of `company` to describe the certifying body.
 */

const mongoose = require('mongoose');

const certificationSchema = mongoose.Schema(
    {
        /** Custom string identifier used for frontend routing. */
        id: { type: String, required: true, unique: true },
        /** Certification name. */
        title: { type: String, required: true },
        /** Certifying body (e.g. "AWS", "Coursera"). */
        issuer: { type: String, required: true },
        /** Certification type / category. */
        type: { type: String },
        /** Date or validity period. */
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

module.exports = mongoose.model('Certification', certificationSchema);
