/**
 * @module middleware/asyncHandler
 * @description Utility wrapper for async Express route handlers.
 *
 * Eliminates repetitive try/catch blocks by catching rejected promises and
 * forwarding the error to Express's built-in error-handling pipeline.
 *
 * @example
 * router.get('/', asyncHandler(async (req, res) => {
 *   const items = await Model.find();
 *   res.json(items);
 * }));
 */

/**
 * @param {Function} fn - Async route handler `(req, res, next) => Promise<void>`.
 * @returns {Function} Express-compatible middleware.
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
