const express = require('express');
const { login, user } = require('../controllers/authController');
const { save, getStudent, markAsLeft, studentQrCheck, updateStudentPersonl, deleteSelectedStudents, getRecentStudents, getStudentDetails, uploadFile, removeFile, setSubjectsAndMarks, removeSubjectsAndMarks } = require('../controllers/studentController');
const { addTeacher, deleteTeacher, getTeacher, updateTeacher, deleteSelectedTeachers, getTeacherDetails } = require('../controllers/teacherController');
const { addStudent, getStudents, searchStudent, deleteStudent, getTeachers, getAdmins, addAdmin, adminDelete, adminUpdateGet, adminUpdate, deleteSelectedAdmins, passwordChange } = require('../controllers/userController');
const { Verify } = require('../middlwares/authMiddlware');
const uploads = require('../middlwares/fileUpload');
const route = express.Router();


route.get('/user', Verify, user);
route.get('/student/:id', Verify, getStudent);
route.get('/students', getStudents);
route.get('/student/search', searchStudent);
route.get('/teachers', Verify, getTeachers);
route.get('/teachers/:id', Verify, getTeacher);
route.get('/admins', Verify, getAdmins);
route.get('/admin/update/:id', Verify, adminUpdateGet);
route.get('/qrcheck/:id' , Verify, studentQrCheck);
route.get('/students/:id', Verify, getStudent);
route.get('/recentstudents', Verify, getRecentStudents);
route.get('/teacher', Verify, getTeacherDetails);
route.get('/student', Verify, getStudentDetails);
route.post('/addStudentAccount', Verify, addStudent);
route.post('/login',login);
route.post('/add/student', Verify, save);
route.post('/student/left', Verify, markAsLeft);
route.post('/add/teachers', Verify, addTeacher);
route.post('/add/admin', Verify, addAdmin);
route.post('/admin/update', Verify, adminUpdate);
route.post('/teacher/update', Verify, updateTeacher);
route.post('/student/update' ,Verify, updateStudentPersonl);
route.post('/file/upload', uploads.single('file'), uploadFile);
route.post('/students/delete/selected', Verify, deleteSelectedStudents);
route.post('/teachers/delete/selected', Verify, deleteSelectedTeachers);
route.post('/admins/delete/selected', Verify, deleteSelectedAdmins);
route.post('/changepass', Verify, passwordChange);
route.post('/removefile', Verify, removeFile);
route.post('/setsubjects', Verify, setSubjectsAndMarks);
route.post('/removesubject', Verify, removeSubjectsAndMarks);
route.delete('/student/delete/:id', Verify, deleteStudent);
route.delete('/admin/delete/:id', Verify, adminDelete);
route.delete('/teachers/delete/:id', Verify, deleteTeacher);


module.exports = route;