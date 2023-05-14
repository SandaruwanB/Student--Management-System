const mongoose = require('mongoose');
const databaseCon = require('../database/connection');

const studentSchema = new mongoose.Schema({
    userid:{
        type : String,
        require : true
    },
    indexnumber:{
        type : String,
        require : true,
        unique : true
    },
    fullname : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    studentcontact:{
        type : String,
        require : true
    },
    birthday : {
        type : String,
        require : true
    },
    gender :{
        type : String,
        require : true
    },
    attendyear : {
        type : String,
        require : true
    }, 
    attendgrade : {
        type : Number,
        require : true
    },
    leavedate: {
        type : String,
        default : null
    },
    parentname : {
        type : String,
        require : true
    },
    parentcontact : {
        type : String,
        require : true
    },
    certificates:{
        type : [String],
        default : null
    },
    subjectsandmarks : [
        {
            grade :{
                type : Number,
                default : null
            },
            subjectname : {
                type : String,
                default : null
            },
            mark :{
                type : Number,
                default : null
            }
        }
    ]
});

const studentDetails = mongoose.model("studentDetails", studentSchema);
module.exports = studentDetails;