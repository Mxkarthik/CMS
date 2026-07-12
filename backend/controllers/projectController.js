const Project = require('../models/Project');

const createProject = async (req,res) => {
   try { 
    const project = await Project.create(req.body);
    res.status(201).json(project);
   }
   catch(error)
   {
    res.status(500).json({
        message : error.message
    });
   }
};

const getAllProjects = async (req,res)=> {
    try 
    {
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch(error)
    {
        res.status(500).json ({
            message : error.message
        });
    }
}

const getProjectById = async (req , res) => {
    try { 
        const { id } = req.params;

        const project = await Project.findById(id);
        if (!project)
        {
            return res.status(404).json({
                message : "Project Not Found"
            });
        }
        res.status(200).json(project);
    }
    catch (error)
    {
        res.status(500).json({
            message : error.message
        });
    }
}

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
                message: "Project not found",
            });
        }

        res.status(200).json(updatedProject);

    } catch (error) {

        res.status(500).json({
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
                message: "Project not found",
            });
        }

        res.status(200).json(deletedProject);

    } catch (error) {

        res.status(500).json({
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