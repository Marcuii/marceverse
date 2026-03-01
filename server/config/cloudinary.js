/**
 * @module config/cloudinary
 * @description Configures the Cloudinary SDK and Multer storage engine.
 *
 * Responsibilities:
 *  - Validates required Cloudinary environment variables at startup
 *  - Maps API route base-paths to Cloudinary upload folders
 *  - Sanitises uploaded filenames and enforces a 5 MB file-size limit
 *  - Exports a pre-configured `upload` Multer instance used by route files
 */

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// ─── Validate required env vars at startup ──────────────────────────────────
const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Folder mapping from route to Cloudinary folder ─────────────────────────
/** @type {Record<string, string>} Maps Express `req.baseUrl` → Cloudinary folder. */
const FOLDER_MAP = {
    '/api/projects': 'marceverse/projects',
    '/api/experience': 'marceverse/experience',
    '/api/education': 'marceverse/education',
    '/api/certification': 'marceverse/certification',
    '/api/activity': 'marceverse/activity',
    '/api/competition': 'marceverse/competition',
    '/api/general': 'marceverse/general',
};

/**
 * Multer-Cloudinary storage engine.
 *
 * Resolves the destination folder at upload time based on the request's
 * base URL, sanitises the original filename, and appends a timestamp
 * for uniqueness.
 */
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        /* Resolve folder from the route; fall back to a generic bucket */
        const folderName = FOLDER_MAP[req.baseUrl] || 'marceverse/uploads';

        // Sanitize filename: keep alphanumeric, hyphens, underscores only
        const nameWithoutExt = path
            .parse(file.originalname)
            .name.replace(/[^a-zA-Z0-9_-]/g, '_');
        const uniqueName = `${nameWithoutExt}_${Date.now()}`;

        return {
            folder: folderName,
            public_id: uniqueName,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        };
    },
});

/** Pre-configured Multer instance with Cloudinary storage and a 5 MB limit. */
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB per file
    },
});

module.exports = { cloudinary, upload };
