/**
 * @module models/GeneralInfo
 * @description Singleton Mongoose schema for site-wide configuration.
 *
 * Stores the portfolio owner's personal branding data: hero section content,
 * about section, skills grouped by category, social links, contact info,
 * CV file/link, and animated typewriter roles.
 *
 * Only one document should exist in this collection at any time.
 */

const mongoose = require('mongoose');

const generalInfoSchema = mongoose.Schema(
    {
        /** Portfolio owner's display name. */
        name: { type: String, required: true },
        /** Animated typewriter role strings (e.g. ["Full-Stack Developer", "UI Designer"]). */
        role: [{ type: String }],
        /** Short tagline displayed below the name. */
        tagline: { type: String },
        /** Hero section description paragraph. */
        heroDescription: { type: String },
        /** Cloudinary URL for the full-width hero image. */
        heroImage: { type: String },

        /** About section content. */
        about: {
            title: { type: String },
            description: { type: String },
            /** Cloudinary URL for the about profile image. */
            image: { type: String },
        },

        /** Curriculum Vitae references. */
        cv: {
            /** Direct file URL (e.g. Cloudinary or Google Drive). */
            file: { type: String },
            /** External link to an online CV / resume. */
            link: { type: String },
        },

        /** Skills grouped by category (e.g. "Frontend", "Backend"). */
        skills: [
            {
                category: { type: String, required: true },
                items: [
                    {
                        name: { type: String, required: true },
                        /** Proficiency level (0–100). */
                        level: { type: Number },
                        /** Icon component name (e.g. "FaReact"). */
                        icon: { type: String },
                    },
                ],
            },
        ],

        /** Social media links. */
        socials: [
            {
                platform: { type: String, required: true },
                url: { type: String, required: true },
                /** Icon component name (e.g. "FaGithub"). */
                icon: { type: String },
            },
        ],

        /** Contact information. */
        contact: {
            email: { type: String },
            phone: { type: String },
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('GeneralInfo', generalInfoSchema);
