require("dotenv").config();
const express = require('express')
const connectDatabase = require('./config/database')

const app = express();

connectDatabase();

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`The Server is Running at ${PORT}`);
});


app.get("/" , (req,res)=>{
    res.send("CMS Backend is Running Successfully !");
});

