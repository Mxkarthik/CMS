const jwt = require("jsonwebtoken");

const googleCallback = (req, res) => {

    const token = jwt.sign(
        {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.redirect("http://localhost:5173/dashboard");
};

module.exports = {
    googleCallback,
};