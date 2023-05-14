const databaseCon = require('../database/connection');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required : true
    },
    password:{
        type : String,
        required: true
    },
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    userimage : {
        type : String,
        default : "no"
    },
    role:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const users = mongoose.model("users", userSchema);
module.exports = users;