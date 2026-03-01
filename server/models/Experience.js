/**
 * @module models/Experience
 * @description Mongoose schema for work / professional experience entries.
 *
 * Uses a custom string `id` (not ObjectId) for frontend routing compatibility.
 * Includes a `details` sub-document with rich descriptions, skills, and multiple
 * Cloudinary images.  The `order` field drives admin-controlled sort order.
 */

const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema(
    {
        /** Custom string identifier used for frontend routing. */
        id: { type: String, required: true, unique: true },
        /** Job title / position. */
        title: { type: String, required: true },
        /** Employer or organisation name. */
        company: { type: String, required: true },
        /** Employment type (e.g. "Full-time", "Internship"). */
        type: { type: String },
        /** Entity category label used by the client UI. */
        tag: { type: String, required: true },
        /** Human-readable date range (e.g. "Jan 2023 – Present"). */
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

module.exports = mongoose.model('Experience', experienceSchema);
