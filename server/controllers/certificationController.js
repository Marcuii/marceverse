const Certification = require('../models/Certification');
const createEntityController = require('./entityController');

const {
    getAll: getCertifications,
    getById: getCertificationById,
    create: createCertification,
    update: updateCertification,
    remove: deleteCertification,
} = createEntityController(Certification, 'Certification');

module.exports = {
    getCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
};