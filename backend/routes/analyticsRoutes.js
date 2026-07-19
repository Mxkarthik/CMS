const express = require("express");

const {
    incrementVisitor,
    incrementProjectView,
    getAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();


router.get("/", getAnalytics);

router.post("/visit", incrementVisitor);

router.post("/project-view", incrementProjectView);


module.exports = router;