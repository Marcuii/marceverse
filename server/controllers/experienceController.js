const Experience = require('../models/Experience');
const createEntityController = require('./entityController');

const {
    getAll: getExperiences,
    getById: getExperienceById,
    create: createExperience,
    update: updateExperience,
    remove: deleteExperience,
} = createEntityController(Experience, 'Experience');

module.exports = {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
};
