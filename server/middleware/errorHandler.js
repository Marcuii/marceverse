/**
 * @module middleware/errorHandler
 * @description Centralised error-handling utilities used by the Express app.
 *
 * Exports:
 *  - `AppError`      — Custom error class carrying an HTTP status code.
 *  - `notFound`      — 404 catch-all middleware placed after all routes.
 *  - `errorHandler`  — Global error handler that normalises Mongoose, Multer,
 *                       and application errors into a consistent JSON response.
 */

/**
 * Custom error class that carries an HTTP status code.
 *
 * Errors created with this class are considered "operational" (expected),
 * and their message is safe to expose to the client.
 *
 * @extends Error
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * 404 catch-all middleware — placed after all route definitions.
 * Creates an `AppError` and forwards it to the global error handler.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const notFound = (req, res, next) => {
    next(new AppError(`Not found — ${req.originalUrl}`, 404));
};

/**
 * Global error-handling middleware.
 *
 * Catches all errors forwarded via `next(err)` or thrown inside `asyncHandler`.
 * Normalises known error types (Multer, Mongoose validation, CastError, duplicate
 * key) into user-friendly JSON responses with appropriate status codes.
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
    // Multer file-size / file-count errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File too large. Maximum size is 5 MB.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE' || err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ message: 'Too many files uploaded.' });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(', ');
        return res.status(409).json({ message: `Duplicate value for: ${field}` });
    }

    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal server error';

    // Only log unexpected (non-operational) errors in full
    if (!err.isOperational) {
        console.error('Unexpected error:', err);
    }

    res.status(statusCode).json({ message });
};

module.exports = { AppError, notFound, errorHandler };
