const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        title: {
        type : String,
        required : true,
        trim: true, 
        },
        description: {
            type: String,
            required : true,
        },
        location: {
            type : String,
            required : true,
        },
        category: {
            type : String,
            required : true,
            enum: ["Residential" , "Commercial" , "Industrial" , "Infrastructure"],
        },
        status : {
            type : String,
            required : true,
            enum: ["Completed" , "Ongoing" , "Upcoming"],
        },
        clinetName: {
            type : String,
        },
        completionDate: {
            type : Date,
        },
        tumbnail: {
            type : String,
        },
        images: [
            {
                type : String,
            },
        ],
        isFeatured: {
            type : Boolean,
            default : false,
        },
    },
    {
        timestamps : true,
    }
    
);

const Project = mongoose.model("Project" , projectSchema);

module.exports = Project;