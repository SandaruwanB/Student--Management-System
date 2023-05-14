const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
const secretKey = process.env.JWT_SECRET;

module.exports.Verify = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secretKey, (err,user)=>{
            if(err){
                return res.json('Invalid Token');
            }
            req.user = user;
            next();
        });
    }
    else{
        return res.json('not authenticated');
    }
}