const express = require("express");
const passport = require("passport");
const {logout} = require("../controllers/authController");
const {
    googleCallback,
} = require("../controllers/authController");

const router = express.Router();


router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    googleCallback
);

router.post("/logout", logout);
module.exports = router;