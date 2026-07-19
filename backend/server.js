require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const passport = require("./config/passport");

const connectDatabase = require("./config/database");

const projectRoutes = require("./routes/projectRoutes");
const heroRoutes = require("./routes/heroRoutes");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

connectDatabase();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

app.use(express.json());

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("CMS Backend is Running Successfully!");
});

app.use("/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/hero", heroRoutes);

app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});