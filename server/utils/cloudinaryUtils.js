/**
 * @module utils/cloudinaryUtils
 * @description Shared Cloudinary helper functions used across controllers.
 *
 * Provides safe image deletion (single & batch), public-ID extraction from
 * Cloudinary URLs, and a utility to parse JSON fields from multipart FormData.
 */

const { cloudinary } = require('../config/cloudinary');

/**
 * Extract the Cloudinary public ID from a full Cloudinary URL.
 * URL format: https://res.cloudinary.com/cloud_name/image/upload/v12345678/folder/public_id.ext
 * Returns: "folder/public_id"
 */
const extractPublicId = (imageUrl) => {
    const urlParts = imageUrl.split('/');
    const versionIndex = urlParts.findIndex(
        (part) => part.startsWith('v') && !isNaN(part.substring(1))
    );

    if (versionIndex === -1) return null;

    const publicIdWithExt = urlParts.slice(versionIndex + 1).join('/');
    return publicIdWithExt.replace(/\.[^/.]+$/, '');
};

/**
 * Delete a single image from Cloudinary by its URL.
 * Silently catches errors — a failed Cloudinary delete should not break the request.
 */
const deleteImageFromCloudinary = async (imageUrl) => {
    if (!imageUrl) return;
    try {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err.message);
    }
};

/**
 * Delete multiple images from Cloudinary in parallel.
 */
const deleteImagesFromCloudinary = async (imageUrls = []) => {
    if (!imageUrls.length) return;
    await Promise.all(imageUrls.map(deleteImageFromCloudinary));
};

/**
 * Safely parse a JSON string field from FormData.
 * Returns the parsed object, or the original value if it's not a string / invalid JSON.
 */
const parseJsonField = (value) => {
    if (typeof value !== 'string') return value;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

module.exports = {
    extractPublicId,
    deleteImageFromCloudinary,
    deleteImagesFromCloudinary,
    parseJsonField,
};
