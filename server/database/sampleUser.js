require('../database/connection');
const bcrypt = require("bcrypt");
const users = require('../models/userModel');

const email = "admin@gmail.com";
const password = "admin@123";
bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(password, salt ,(err, hash)=>{
        const user = new users({
            email : email,
            password : hash,
            firstname : "sandaruwan",
            lastname : "bandara",
            role : "admin"
        });
        user.save().then(()=>{
            console.log("saved to database");
        })
    })
})
