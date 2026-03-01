const Education = require('../models/Education');
const createEntityController = require('./entityController');

const {
    getAll: getEducations,
    getById: getEducationById,
    create: createEducation,
    update: updateEducation,
    remove: deleteEducation,
} = createEntityController(Education, 'Education');

module.exports = {
    getEducations,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation,
};