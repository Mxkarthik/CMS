const express = require('express')

const app = express();


app.listen(3000 , ()=>{
    console.log("The Server is Running at PORT 3000");
});


app.get("/" , (req,res)=>{
    res.send("CMS Backend is Running Successfully !");
});

