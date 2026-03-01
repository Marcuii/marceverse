const Competition = require('../models/Competition');
const createEntityController = require('./entityController');

const {
    getAll: getCompetitions,
    getById: getCompetitionById,
    create: createCompetition,
    update: updateCompetition,
    remove: deleteCompetition,
} = createEntityController(Competition, 'Competition');

module.exports = {
    getCompetitions,
    getCompetitionById,
    createCompetition,
    updateCompetition,
    deleteCompetition,
};