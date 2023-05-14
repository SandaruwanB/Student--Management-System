import React, { useState } from 'react'
import {ArrowBarLeft, EyeFill, EyeSlashFill} from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import jsCookies from 'js-cookies'

const AddStudent = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [indeNumber, setIndexNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [studentContact, setStudentContact] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [attendYear, setAttendYear] = useState("");
    const [attendGrade, setAttendGrade] = useState("");
    const [leaveDate, setLeaveDate] = useState("");
    const [parentName, setParentName] = useState("");
    const [parentContact, setParentContact] = useState("");
    const token = jsCookies.getItem('token');
    
    const showAlert = (text) => toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const showSuccess = (text)=>toast.success(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    
    const addStudentAccount = (e)=>{
        e.preventDefault();
        if(checked){
            if(firstName === "" || lastName === "" || email === "" || password === "" || indeNumber === "" || fullName === "" || address === "" || studentContact === "" || birthday === "" || gender === "" || attendYear === "" || attendGrade === "" || parentName === "" || parentContact === ""){
                showAlert("You Missed some Required Fields");
            }
            else{
                axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                axios.post("http://localhost:8080/add/student", {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password,
                    indexNumber : indeNumber,
                    fullName : fullName,
                    address : address,
                    studentContact : studentContact,
                    birthday : birthday,
                    gender : gender,
                    attendYear : attendYear,
                    attendGrade : attendGrade,
                    leaveDate : leaveDate,
                    parentName : parentName,
                    parentContact : parentContact
                }).then(res=>{
                    if(res.data.result === "user"){
                        showAlert("User Already Registered.")
                    }
                    else if(res.data.result === "success"){
                        showSuccess("User Added Successfully.")
                    }
                    else{
                        jsCookies.removeItem('token');
                        navigate('/');
                    }
                });
            }
        }
        else{
            if(firstName === "" || lastName === "" || email === "" || password === ""){
                showAlert("All Fields are Required.");
            }
            else{ 
                axios.defaults.headers.common['Authorization'] = "Bearer " + token;           
                axios.post("http://localhost:8080/addStudentAccount", {
                    firstname : firstName,
                    lastname : lastName,
                    email : email,
                    password : password
                }).then((res ,err)=>{
                    if(res.data.result === "user"){
                        showAlert("User Already Exists");
                    }
                    else if(res.data.result === "success"){
                        showSuccess("User Account Added Successfully.")
                    }
                    else{
                        jsCookies.removeItem('token');
                        navigate('/');
                    }
                });            
            }
        }
    }

    const showPass = ()=>{
        document.getElementById('showPass').classList.add('d-none');
        document.getElementById('password').type = 'text';
        document.getElementById('hidePass').classList.remove('d-none');
    }
    const hidePass = ()=>{
        document.getElementById('showPass').classList.remove('d-none');
        document.getElementById('password').type = 'password';
        document.getElementById('hidePass').classList.add('d-none');
    }

    return (
    <div>
        <div className="text-center mt-5">
            <h3 style={{color : 'rgb(17, 20, 54)'}}>Add New Student Details</h3>
        </div>
        <div className='container'>
            <div className='mb-4' style={{marginTop: '70px'}}>
                <Link to={'/admin/students'}><button className='btn btn-md btn-info text-light'><ArrowBarLeft style={{fontSize: '1.6rem'}}/> Go Back</button></Link>
            </div>
            <h6>User Account Details and Personal Details</h6>
            <hr />
            <div className="row mt-3 mb-5">
                <div className="mx-auto col-12 col-md-10 col-lg-8">
                    <form className='container stu-add-form mx-auto'>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="First name" onChange={(e)=>{setFirstName(e.target.value)}}/>
                                <span style={{marginLeft: '10px'}}>First Name</span>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Last name" onChange={(e)=>{setLastName(e.target.value)}}/>
                                <span style={{marginLeft: '10px'}}>Last Name</span>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="email" className='form-control' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                                <span style={{marginLeft: '10px'}}>Email Address</span>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col" style={{position: 'relative'}}>
                                <input className='form-control' id='password' placeholder='Password' type={'password'} onChange={(e)=>{setPassword(e.target.value)}}/>
                                <div className='icon' style={{position: 'absolute', top: '12%', right : '30px', cursor : 'pointer'}}>
                                    <EyeFill onClick={showPass} id='showPass'/>
                                    <EyeSlashFill className='d-none' onClick={hidePass} id='hidePass'/>
                                </div>
                                <span style={{marginLeft: '10px'}}>Password</span>
                            </div>
                        </div>
                        <div className="mt-3 form-check" style={{marginLeft : '10px'}}>
                            <input type="checkbox" className='form-check-input' onChange={()=>{setChecked(!checked)}}/>
                            <span className='form-check-label'>add student's personal data this time.</span>
                        </div>                        
                        { checked ? (
                            <div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="text" className='form-control' onChange={(e)=>{setIndexNumber(e.target.value)}} placeholder='Index Number'/>
                                        <span style={{marginLeft: '10px'}}>Index Number</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="text" className='form-control' onChange={(e)=>{setFullName(e.target.value)}} placeholder='Full Name'/>
                                        <span style={{marginLeft: '10px'}}>Full Name</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="date" className='form-control' onChange={(e)=>{setBirthday(e.target.value)}} placeholder='Birthday'/>
                                        <span style={{marginLeft: '10px'}}>Birthday</span>
                                    </div>
                                    <div className="col">
                                        <select className="form-select" aria-label="Default select example" onChange={(e)=>{setGender(e.target.value)}}>
                                            <option>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <span style={{marginLeft : '10px'}}>Gender</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="text" className='form-control' onChange={(e)=>{setAddress(e.target.value)}} placeholder='Address'/>
                                        <span style={{marginLeft: '10px'}}>Address</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="text" className='form-control' onChange={(e)=>{setStudentContact(e.target.value)}} placeholder='Contact Number'/>
                                        <span style={{marginLeft: '10px'}}>Contact Number</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="date" className='form-control' placeholder='Attend Year' onChange={(e)=>{setAttendYear(e.target.value)}}/>
                                        <span style={{marginLeft: '10px'}}>Attend Year</span>
                                    </div>
                                    <div className="col">
                                        <input type="number" className='form-control' placeholder='Attend Grade' onChange={(e)=>{setAttendGrade(e.target.value)}} />
                                        <span style={{marginLeft : '10px'}}>Attend Grade</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="date" className='form-control' onChange={(e)=>{setLeaveDate(e.target.value)}} placeholder='Left Date'/>
                                        <span style={{marginLeft: '10px'}}>Left Date <small>(if the student left note the date here)</small></span>
                                    </div>
                                    <div className="col"></div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input type="text" className='form-control' placeholder='Parent Name' onChange={(e)=>{setParentName(e.target.value)}}/>
                                        <span style={{marginLeft: '10px'}}>Parent Name</span>
                                    </div>
                                    <div className="col">
                                        <input type="text" className='form-control' placeholder='Parent Contact Number' onChange={(e)=>{setParentContact(e.target.value)}} />
                                        <span style={{marginLeft : '10px'}}>Parent Contact Number</span>
                                    </div>
                                </div>

                                
                            </div>

                        ) : ("")
                        
                        }
                        <div>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                        </div>
                        <button className='mt-4 btn btn-md btn-primary' onClick={addStudentAccount}>Add Student</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddStudent