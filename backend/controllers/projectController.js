const Project = require("../models/Project");
const uploadImage = require("../services/uploadService");
const deleteImage = require("../services/deleteImageService");

const createProject = async (req, res) => {
    const uploadedPublicIds = [];

    try {

        const {
            title,
            description,
            location,
            category,
            status,
            clientName,
            completionDate,
            isFeatured,
        } = req.body;

        const thumbnailFile = req.files?.thumbnail?.[0];
        const galleryFiles = req.files?.images || [];

        let thumbnail = null;

        if (thumbnailFile) {

            thumbnail = await uploadImage(thumbnailFile, {
                folder: "projects/thumbnails",
            });

            uploadedPublicIds.push(thumbnail.publicId);

        }

        const images = await Promise.all(
            galleryFiles.map(async (file) => {

                const image = await uploadImage(file, {
                    folder: "projects/gallery",
                });

                uploadedPublicIds.push(image.publicId);

                return image;

            })
        );

        const project = await Project.create({
            title,
            description,
            location,
            category,
            status,
            clientName,
            completionDate,
            isFeatured,
            thumbnail,
            images,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project,
        });

    } catch (error) {

        await Promise.allSettled(
            uploadedPublicIds.map((publicId) =>
                deleteImage(publicId)
            )
        );

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