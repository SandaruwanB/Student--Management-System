const bcrypt = require('bcrypt');
const users = require('../models/userModel');
const studentDetails = require('../models/studentModel');

module.exports.addStudent = (req,res)=>{
    users.findOne({email : req.body.email}).then((user)=>{
        if(user === null){
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(req.body.password,salt, (err, hash)=>{
                    const user = new users({
                        email : req.body.email,
                        password : hash,
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        role : "student"
                    });
                    user.save().then(()=>{
                        users.findOne({email : req.body.email}).then(user =>{
                            res.json({result : "success", user});
                        })
                    })
                })
            })
        }
        else{
            res.json({result : "user"});
        }
    })


}
module.exports.getStudents = (req,res)=>{
    users.find({role : "student"}).then((data)=>{
        res.json({result : "success" , data});
    });
}

module.exports.searchStudent = (req,res)=>{
    
}

module.exports.deleteStudent = (req,res)=>{
    const id = req.params.id;
    users.findByIdAndDelete(id).then(()=>{
        studentDetails.findOneAndDelete({userid : id}).then(()=>{
            res.json({result : "success"});
        })
    });
}

module.exports.getTeachers = (req,res)=>{
    users.find({role : 'teacher'}).then((data)=>{
        res.json({result : 'success', data});
    });
}

module.exports.getAdmins = (req,res)=>{
    users.find({role : "admin"}).then((data)=>{
        res.json({result : 'success', data});
    });
}

module.exports.addAdmin = (req,res)=>{
    users.findOne({email : req.body.email}).then(user=>{
        if(user === null){
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(req.body.password,salt, (err,hash)=>{
                    const user = new users({
                        email : req.body.email,
                        firstname : req.body.firstName,
                        lastname : req.body.lastName,
                        password : hash,
                        role : 'admin'
                    });
                    user.save().then(()=>{
                        res.json({result : "success"});
                    })
                })
            })
        } 
        else{
            res.json({result : 'user'});
        }
    })
}

module.exports.adminDelete = (req,res)=>{
    const id = req.params.id;
    users.findByIdAndDelete(id).then(()=>{
        res.json({result : "success"});
    })
}

module.exports.adminUpdateGet = (req,res)=>{
    const id = req.params.id;
    users.findById(id).then((data)=>{
        res.json({result : "success", data});
    })
}

module.exports.adminUpdate = (req,res)=>{
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(req.body.password,salt, (err,hash)=>{
            users.findByIdAndUpdate(req.body.id, {$set : {email : req.body.email, firstname : req.body.firstname, lastname : req.body.lastname, password : hash}}).then(()=>{
                res.json({result : 'success'});
            });
        })
    })
}


module.exports.deleteSelectedAdmins = (req,res)=>{
    const user = req.user.user;
    if(req.body.data === 'all'){
        users.findOne({email : user}).then(user=>{
            const id = user._id;
            users.deleteMany({role : 'admin', _id : {$ne : id}}).then(()=>{
                res.json({result : "success"});
            })
        })
    }
    else{
        users.deleteMany({_id : req.body.data}).then(()=>{
            res.json({result : 'success'});
        })
    }
}

module.exports.passwordChange = (req,res)=>{
    const email = req.user.user;
    users.findOne({email : email}).then(user=>{
        bcrypt.compare(req.body.oldpass, user.password).then(result=>{
            if(result){
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(req.body.newpass, salt, (err,hash)=>{
                        users.findByIdAndUpdate(user._id,{$set : {password : hash}}).then(()=>{
                            res.json({result : 'success'});
                        })
                    })
                })
            }
            else{
                res.json({result : 'pass'});
            }
        })
    })
}