/**
 * @file api.js
 * @description Axios HTTP client for the admin panel.
 *
 * Creates a pre-configured Axios instance that:
 *  - Points at the Express server's `/api` base URL
 *  - Automatically attaches the admin API key from localStorage
 *
 * Exports named functions for every CRUD operation across all entity
 * types (Projects, Experience, Education, Certification, Activity,
 * Competition, GeneralInfo) plus authentication and reorder helpers.
 */

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Auth interceptor ───────────────────────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers['x-api-key'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ─── Projects ───────────────────────────────────────────────────────────
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProject = (id, data) => api.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ─── Experience ─────────────────────────────────────────────────────────
export const getExperiences = () => api.get('/experience');
export const getExperienceById = (id) => api.get(`/experience/${id}`);
export const createExperience = (data) => api.post('/experience', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

// Education
export const getEducations = () => api.get('/education');
export const getEducationById = (id) => api.get(`/education/${id}`);
export const createEducation = (data) => api.post('/education', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateEducation = (id, data) => api.put(`/education/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteEducation = (id) => api.delete(`/education/${id}`);

// Certification
export const getCertifications = () => api.get('/certification');
export const getCertificationById = (id) => api.get(`/certification/${id}`);
export const createCertification = (data) => api.post('/certification', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateCertification = (id, data) => api.put(`/certification/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCertification = (id) => api.delete(`/certification/${id}`);

// Activity
export const getActivities = () => api.get('/activity');
export const getActivityById = (id) => api.get(`/activity/${id}`);
export const createActivity = (data) => api.post('/activity', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateActivity = (id, data) => api.put(`/activity/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteActivity = (id) => api.delete(`/activity/${id}`);

// Competition
export const getCompetitions = () => api.get('/competition');
export const getCompetitionById = (id) => api.get(`/competition/${id}`);
export const createCompetition = (data) => api.post('/competition', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateCompetition = (id, data) => api.put(`/competition/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCompetition = (id) => api.delete(`/competition/${id}`);

// ─── General Info ───────────────────────────────────────────────────────
export const getGeneralInfo = () => api.get('/general');
export const updateGeneralInfo = (data) => api.put('/general', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// ─── Reorder / Auth ─────────────────────────────────────────────────────
export const reorderItems = (type, items) => api.put(`/reorder/${type}`, { items });

// ─── Auth ─────────────────────────────────────────────────────────────
export const verifyToken = (token) => api.get('/auth/verify', {
    headers: { 'x-api-key': token }
});

export default api;
