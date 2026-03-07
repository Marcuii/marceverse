/**
 * @module controllers/projectController
 * @description CRUD operations for the Project model.
 *
 * Unlike generic entities, Projects use MongoDB `_id`, support a single
 * image upload (not an images array), and store a comma-delimited `tags`
 * field that is normalised into an array on create/update.
 */

const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const { deleteImageFromCloudinary } = require('../utils/cloudinaryUtils');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json(projects);
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = asyncHandler(async (req, res) => {
    const { name, description, category, tags, repo, demo } = req.body;

    let image = '';
    if (req.file) {
        image = req.file.path;
    } else if (req.body.image) {
        image = req.body.image;
    }

    // Atomic order assignment
    const lastProject = await Project.findOne().sort({ order: -1 });
    const order = lastProject?.order !== undefined ? lastProject.order + 1 : 0;

    const project = await Project.create({
        name,
        description,
        category,
        image,
        tags: tags
            ? (Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim()))
            : [],
        repo,
        demo,
        order,
    });

    res.status(201).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        throw new AppError('Project not found', 404);
    }

    const { name, description, category, tags, repo, demo } = req.body;

    let image = project.image;
    if (req.file) {
        // Delete old image from Cloudinary before replacing
        await deleteImageFromCloudinary(project.image);
        image = req.file.path;
    }

    const parsedTags = tags
        ? (Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim()))
        : project.tags;

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        { name, description, category, image, tags: parsedTags, repo, demo },
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedProject);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        throw new AppError('Project not found', 404);
    }

    await deleteImageFromCloudinary(project.image);
    await project.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
