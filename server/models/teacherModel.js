const mongoose = require('mongoose');
const databaseCon = require('../database/connection');


const teacherSchema = new mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    fullname : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    birthday : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    subjects : []
});

const teacherDetails = mongoose.model("teacherDetails", teacherSchema);
module.exports = teacherDetails;