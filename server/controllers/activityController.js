const Activity = require('../models/Activity');
const createEntityController = require('./entityController');

const {
    getAll: getActivitys,
    getById: getActivityById,
    create: createActivity,
    update: updateActivity,
    remove: deleteActivity,
} = createEntityController(Activity, 'Activity');

module.exports = {
    getActivitys,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
};