const express = require('express')

const router = express.Router();
const {createProject , getAllProjects, getProjectById} = require("../controllers/projectController")


router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id",getProjectById);

module.exports = router;