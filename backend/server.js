require("dotenv").config();
const express = require('express')
const connectDatabase = require('./config/database')
const projectRoutes = require('./routes/projectRoutes')
const heroRoutes = require('./routes/heroRoutes')
const passport = require("./config/passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


const app = express();

app.use(express.json());
connectDatabase();

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`The Server is Running at ${PORT}`);
});

app.use(cookieParser());
app.use(passport.initialize());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRoutes);

app.get("/" , (req,res)=>{
    res.send("CMS Backend is Running Successfully !");
});

app.use('/api/projects',projectRoutes);

app.use('/api/hero',heroRoutes);

app.use("/api/analytics", analyticsRoutes);

