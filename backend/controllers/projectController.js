const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getAllProjects = async (req, res) => {
    try {

        const projects = await Project.find().lean();

        return res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getProjectById = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await Project.findById(id).lean();

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: project,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const updateProjectById = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: updatedProject,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteProjectById = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully.",
            data: deletedProject,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
};