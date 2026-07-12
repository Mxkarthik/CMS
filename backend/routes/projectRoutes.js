const express = require('express')
const authenticate = require('../middleware/authenticate')


const router = express.Router();
const {createProject , getAllProjects, getProjectById , updateProjectById , deleteProjectById} = require("../controllers/projectController")


router.post("/",authenticate , createProject);
router.get("/", getAllProjects);
router.get("/:id",getProjectById);
router.put("/:id" , authenticate ,updateProjectById)
router.delete("/:id", authenticate ,deleteProjectById)

module.exports = router;