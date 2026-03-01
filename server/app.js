/**
 * @module app
 * @description Express application factory for the MarceVerse portfolio API.
 *
 * This module configures the Express app (middleware, routes, error handlers)
 * but does NOT start the server or connect to MongoDB.  That responsibility
 * belongs to the consumer:
 *
 *  - Local development → `server.js` (connects to DB, calls `app.listen`)
 *  - Vercel serverless  → `api/index.js` (lazy DB connection on cold start)
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Route imports
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const educationRoutes = require('./routes/educationRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const activityRoutes = require('./routes/activityRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const generalInfoRoutes = require('./routes/generalInfoRoutes');
const reorderRoutes = require('./routes/reorderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
}));

// ─── Security ────────────────────────────────────────────────────────────────
app.use(helmet());

// ─── Rate Limiting ───────────────────────────────────────────────────────────
/** Stricter limit on sensitive write endpoints (auth, reorder). */
const writeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 60,
    message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/auth', writeLimiter);
app.use('/api/reorder', writeLimiter);

/** Generous global limit for public read-heavy endpoints. */
const globalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200,
    message: { message: 'Too many requests, please try again later.' },
});
app.use('/api', globalLimiter);

// ─── Body Parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certification', certificationRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/competition', competitionRoutes);
app.use('/api/general', generalInfoRoutes);
app.use('/api/reorder', reorderRoutes);
app.use('/api/auth', authRoutes);

/** Health-check endpoint (useful for uptime monitors and load balancers). */
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'MarceVerse API v3.0 is running' });
});

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
