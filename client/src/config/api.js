/**
 * @file api.js
 * @description Shared API base URL used by all client-side fetch calls.
 *
 * Reads from the `VITE_API_BASE_URL` environment variable at build time;
 * falls back to localhost for local development.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
