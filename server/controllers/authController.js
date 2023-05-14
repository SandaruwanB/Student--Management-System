const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
const users = require('../models/userModel');
const secretToken = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

module.exports.login = (req,res)=>{
    const { username, password } = req.body;

    users.findOne({email: username}).then((user)=>{
        if(user === null){
            res.json({error: 'user'});
        }
        else{
            bcrypt.compare(password, user.password).then((result)=>{
                if(result){
                    const token = jwt.sign({user : user.email , role : user.role, firstname : user.firstname, lastname : user.lastname, image : user.userimage }, secretToken);
                    res.json({
                        error : null,
                        user : user.email,
                        role : user.role,
                        token : token
                    })
                }
                else{
                    res.json({error : "pass"});
                }
            });
        }
    });
}

module.exports.user = (req,res)=>{
    const userData = req.user;
    users.findOne({email: userData.user}).then((user)=>{
        res.json(user);
    })
}