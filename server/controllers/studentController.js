const bcrypt = require('bcrypt');
const studentDetails  = require('../models/studentModel');
const users = require('../models/userModel');
const fs = require('fs');

module.exports.save = (req,res)=>{
    users.findOne({email : req.body.email}).then((user)=>{
        if(user === null){
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(req.body.password, salt, (err,hash)=>{
                    const user = new users({
                        email : req.body.email,
                        password : hash,
                        firstname : req.body.firstName,
                        lastname : req.body.lastName,
                        role : "student"
                    });
                    user.save().then(()=>{
                        users.findOne({email : req.body.email}).then(user=>{
                            const student = new studentDetails({
                                userid : user._id,
                                indexnumber : req.body.indexNumber,
                                fullname : req.body.fullName,
                                address : req.body.address,
                                studentcontact : req.body.studentcontact,
                                birthday : req.body.birthday,
                                gender : req.body.gender,
                                attendyear : req.body.attendYear,
                                attendgrade : req.body.attendGrade,
                                leavedate : req.body.leaveDate,
                                parentname : req.body.parentName,
                                parentcontact : req.body.parentContact
                            });
                            student.save().then(()=>{
                                res.json({result : "success"});
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

module.exports.getStudent = (req,res)=>{
    const userID = req.params.id;
    users.findOne({_id : userID}).then((user)=>{
        studentDetails.findOne({userid : user._id}).then((studentData)=>{
            if(studentData === null){
                res.json({result : "notFound", account : user});
            }
            else{
                res.json({result : "success" ,account : user, student : studentData});
            }
        })
    })
}

module.exports.markAsLeft = (req,res)=>{
    const userID = req.body.userID;
    const leftDate = req.body.leftDate;
    
    studentDetails.findOneAndUpdate({userid : userID}, {$set : {leavedate : leftDate}}).then(()=>{
        users.findOne({_id : userID}).then(user=>{
            studentDetails.findOne({userid : userID}).then(student=>{
                res.json({result : 'success', account : user, student : student});
            });
        })
    });
}

module.exports.studentQrCheck = (req,res)=>{
   const qrData = req.params.id;
   users.findById(qrData).then(user=>{
    if(user){
        res.json({result : 'success'});
    }
    else{
        res.json({result : 'notfound'});
    }
   });
}

module.exports.updateStudentPersonl = (req,res)=>{
    users.findByIdAndUpdate(req.body.userid, {$set : {firstname : req.body.firstname, lastname : req.body.lastname, email : req.body.email}}).then(()=>{
        studentDetails.findOne({userid : req.body.userid}).then(user=>{
            if(user){
                studentDetails.findOneAndUpdate({userid : req.body.userid}, {$set : {indexnumber : req.body.index, fullname : req.body.fullname, birthday : req.body.birthday, gender : req.body.gender, address : req.body.address, studentcontact : req.body.contact, attendgrade : req.body.attendGrade, attendyear : req.body.attendYear, leavedate : req.body.leaveYear.length > 11 ? "" : req.body.leaveYear, parentname : req.body.parent, parentcontact : req.body.parentcontact}}).then(()=>{
                    res.json({result : 'success'});
                })
            }
            else{
                
                const student = new studentDetails({
                    userid : req.body.userid,
                    indexnumber : req.body.index, 
                    fullname : req.body.fullname, 
                    birthday : req.body.birthday, 
                    gender : req.body.gender, 
                    address : req.body.address, 
                    studentcontact : req.body.contact, 
                    attendgrade : req.body.attendGrade, 
                    attendyear : req.body.attendYear, 
                    leavedate : req.body.leaveYear.length > 11 ? "" : req.body.leaveYear, 
                    parentname : req.body.parent,
                    parentcontact : req.body.parentcontact
                });
                student.save().then(()=>{
                    res.json({result : 'success'});
                })
            }
        })
    })
}

module.exports.deleteSelectedStudents = (req,res)=>{
    if(req.body.data === "all"){
        users.deleteMany({role : 'student'}).then(()=>{
            studentDetails.deleteMany({}).then(()=>{
                res.json({result : 'success'});
            })
        })
    }
    else{
        users.deleteMany({_id : req.body.data, role : 'student'}).then(()=>{
            studentDetails.deleteMany({userid : req.body.data}).then(()=>{
                res.json({result : "success"});
            })
        })
    }
}


module.exports.getRecentStudents = (req,res)=>{
    users.find({role : 'student'}).sort('createdAt').limit(5).then(user=>{
        res.json({result : 'success', student : user});
    })
}

module.exports.getStudentDetails = (req,res)=>{
    users.findOne({email : req.user.user}).then(user=>{
        studentDetails.findOne({userid : user._id}).then(student=>{
            res.json({result : "success", user, student});
        })
    })
}


module.exports.uploadFile = (req,res)=>{
    studentDetails.findOne({userid : req.body.student}).then(user=>{
        studentDetails.findOne({certificates : [req.body.filename]}).then((data)=>{
            if(data){
                res.json({result : 'have'});
            }
            else{
                studentDetails.findByIdAndUpdate(user._id,{$push : {certificates : [req.body.filename]}}).then(()=>{
                    res.json({result : 'success'});
                });
            }
        })
    })
}


module.exports.removeFile = (req,res)=>{
    const file = req.body.file;
    const path = '../client/public/uploads/'+file;
    users.findById(req.body.id).then(user=>{
        studentDetails.findOneAndUpdate({userid : user._id},{$pull : {certificates : file}}).then(()=>{
            fs.unlinkSync(path);
            res.json({result : 'success'});
        })
    })
}

module.exports.setSubjectsAndMarks = (req,res)=>{
    const myObject = {
        subjectname : req.body.subject,
        grade : req.body.grade,
        mark : req.body.mark
    }
    users.findById(req.body.id).then(user=>{
        studentDetails.findOneAndUpdate({userid : user._id},{$push : {subjectsandmarks : myObject}}).then(()=>{
            res.json({result : 'success'});
        })
    })
}

module.exports.removeSubjectsAndMarks = (req,res)=>{
    studentDetails.findOneAndUpdate({userid : req.body.userid},{$pull : {subjectsandmarks : {_id : req.body.subid}}}).then(()=>{
        res.json({result : 'success'});
    })
}