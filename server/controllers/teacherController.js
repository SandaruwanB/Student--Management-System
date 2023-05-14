const bcrypt = require('bcrypt');
const users = require('../models/userModel');
const teacherDetails = require("../models/teacherModel");


module.exports.addTeacher = (req,res)=>{
    users.findOne({email : req.body.email}).then(user=>{
        if(user === null){
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                    const user = new users({
                        email : req.body.email,
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        password : hash,
                        role : 'teacher'
                    });
                    user.save().then(()=>{
                        users.findOne({email : req.body.email}).then(user=>{
                            const teacher = new teacherDetails({
                                userid : user._id,
                                fullname : req.body.fullname,
                                gender : req.body.gender,
                                birthday : req.body.birthday,
                                address : req.body.address,
                                contact : req.body.contact,
                                subjects : req.body.subjects
                            });
                            teacher.save().then(()=>{
                                res.json({result : 'success'});
                            })
                        })
                    })
                })
            })
        }
        else{
            res.json({result : 'user'});
        }
    })
}

module.exports.deleteTeacher = (req,res)=>{
    const id = req.params.id;
    users.findByIdAndDelete(id).then(()=>{
        teacherDetails.findOneAndDelete({userid : id}).then(()=>{
            res.json({result : 'success'});
        })
    })
}

module.exports.getTeacher = (req,res)=>{
    const id = req.params.id;
    users.findOne({_id : id}).then(user=>{
        teacherDetails.findOne({userid : id}).then(teacher=>{
            res.json({result : 'success', account : user, teacher : teacher});
        })
    })
}

module.exports.updateTeacher = (req,res)=>{
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(req.body.password, salt, (err,hash)=>{
            users.findByIdAndUpdate(req.body.userid, {$set : {email : req.body.email, firstname : req.body.firstname, lastname : req.body.lastname, password : hash}}).then(()=>{
                teacherDetails.findOneAndUpdate({userid : req.body.userid}, {$set : {fullname : req.body.fullname, gender : req.body.gender, birthday : req.body.birthday, address : req.body.address, contact : req.body.contact, subjects : req.body.subjects}}).then(()=>{
                    res.json({result : "success"});
                })
            })
        })
    })
}

module.exports.deleteSelectedTeachers = (req,res)=>{
    if(req.body.data === "all"){
        users.deleteMany({role : 'teacher'}).then(()=>{
            teacherDetails.deleteMany({}).then(()=>{
                res.json({result : 'success'});
            })
        })
    }
    else{
        users.deleteMany({_id : req.body.data}).then(()=>{
            teacherDetails.deleteMany({userid : req.body.data}).then(()=>{
                res.json({result : 'success'});
            })
        })
    }
}

module.exports.getTeacherDetails = (req,res)=>{
    users.findOne({email : req.user.user}).then(user=>{
        teacherDetails.findOne({userid : user._id}).then(teacher=>{
            res.json({result : 'success', user, teacher});
        })
    })
}