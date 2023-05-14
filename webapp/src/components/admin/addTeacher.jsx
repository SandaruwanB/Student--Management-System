import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ArrowBarLeft, EyeFill, EyeSlashFill, PlusCircleFill, XCircleFill} from 'react-bootstrap-icons'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import jsCookies from 'js-cookies'

const AddTeachers = () => {
  const navigate = useNavigate();
  const [subjects,setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");


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

  const addTeacher = ()=>{

      if(firstname === "" || lastname === "" || email === "" || password === "" || fullname === "" || gender === "" || birthday === "" || address === "" || contact === ""){
        showAlert("All Fields are Required.")
      }
      else{
        if(subjects.length > 0){
          axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
          axios.post("http://localhost:8080/add/teachers", {
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : password,
            fullname : fullname,
            gender : gender,
            birthday : birthday,
            address : address,
            contact : contact,
            subjects : subjects
          }).then(res=>{
            if(res.data.result === "user"){
              showAlert("This account Already Exists");
            }
            else if(res.data.result === "success"){
              showSuccess("Teacher Details Added Successfully");
            }
            else{
              jsCookies.removeItem('token');
              navigate('/');
            }
          });
        }
        else{
          showAlert("Please Specify at Least One Subject.");
        }
      } 

  }

  const subjectAddArray = (e)=>{
    e.preventDefault();
    if(subject === ""){
      showAlert("Subject Cannot be Empty.");
    }
    else{
      setSubjects(oldArray=>[
        ...oldArray, 
        subject
      ]);
      setSubject("");
    }
  }

  const subjectRemArray = (index)=>{
    const temp = [...subjects];
    temp.splice(index, 1);
    setSubjects(temp);
    setSubject("");
  }
  
  const showPass = ()=>{
    document.getElementById('showPass').classList.add('d-none')
    document.getElementById('hidePass').classList.remove('d-none');
    document.getElementById('password').type = "text";
  }
  const hidePass = ()=>{
    document.getElementById('showPass').classList.remove('d-none')
    document.getElementById('hidePass').classList.add('d-none');
    document.getElementById('password').type = "password";
  }

  return (
    <div>
      <div className="text-center mt-5">
        <h3 style={{color : 'rgb(17, 20, 54)'}}>Add New Teacher Details</h3>
      </div>
      <div className='container'>
        <div className='mb-4' style={{marginTop: '70px'}}>
          <Link to={'/admin/teachers'}><button className='btn btn-md btn-info text-light'><ArrowBarLeft style={{fontSize: '1.6rem'}}/> Go Back</button></Link>
        </div>
        <h6>User Account Details and Personal Details</h6>
        <hr />
        <div className="row mt-3 mb-5">
          <div className="mx-auto col-12 col-md-10 col-lg-8">
            <div className="container mx-auto">
              <div className="row">
                <div className="col">
                  <input type="text" onChange={(e)=>{setFirstName(e.target.value)}} className='form-control' placeholder='first name'/>
                  <span style={{marginLeft: '10px'}}>First Name</span>
                </div>
                <div className="col">
                  <input type="text" onChange={(e)=>{setLastName(e.target.value)}} className='form-control' placeholder='last name'/>
                  <span style={{marginLeft : '10px'}}>Last Name</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className='form-control' placeholder='email'/>
                  <span style={{marginLeft: '10px'}}>Email</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col" style={{position: 'relative'}}>
                  <input className='form-control' onChange={(e)=>(setPassword(e.target.value))} id='password' placeholder='Password' type={'password'} />
                  <div className='icon' style={{position: 'absolute', top: '12%', right : '30px', cursor : 'pointer'}}>
                    <EyeFill onClick={showPass} id='showPass'/>
                    <EyeSlashFill className='d-none' onClick={hidePass} id='hidePass'/>
                  </div>
                  <span style={{marginLeft: '10px'}}>Password</span>
                </div>
                <div className="col"></div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <input type="text" onChange={(e)=>{setFullName(e.target.value)}} placeholder='full name'className='form-control'/>
                  <span style={{marginLeft : '10px'}}>Full Name</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <select className='form-select' onChange={(e)=>{setGender(e.target.value)}}>
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <span style={{marginLeft : '10px'}}>Gender</span>
                </div>
                <div className="col">
                  <input type="date" onChange={(e)=>{setBirthday(e.target.value)}} placeholder='birthday' className='form-control'/>
                  <span style={{marginLeft : '10px'}}>Birthday</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <input type="text" onChange={(e)=>{setAddress(e.target.value)}} placeholder='address' className='form-control' />
                  <span style={{marginLeft : '10px'}}>Address</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <input type="text" onChange={(e)=>{setContact(e.target.value)}} placeholder='contact number' className='form-control'/>
                  <span style={{marginLeft : '10px'}}>Contact Number</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">   
                  <span style={{marginLeft : '20px'}} className="d-block p-3">Add Teaching Subjects</span>               
                  {subjects.length === 0 ? 
                  ( 
                    <div>
                      <input type="text" id='subject-input1' placeholder='subject name' style={{outline : 'none', letterSpacing : '1px', border : "none", borderBottom : "2px solid black", width : '70%'}} onChange={(e)=>{setSubject(e.target.value)}} className="p-2"/>
                      <button className='btn btn-sm btn-outline-success mt-2' style={{marginLeft : '20px'}} onClick={subjectAddArray}><PlusCircleFill style={{fontSize : '1.3rem', paddingRight : '2px'}}/> Add Subject</button>
                    </div>
                  ):(
                    <div>
                      <table style={{marginLeft : '20px'}}>
                        <tbody>
                          {subjects.map((value, index)=>{
                            return <tr className='mt-2' key={index}>
                              <td>{value}</td>
                              <td><button className='btn btn-sm btn-outline-danger mt-3' style={{marginLeft : '20px'}} onClick={()=>subjectRemArray(index)}><XCircleFill style={{fontSize : '1.3rem', paddingRight : '2px'}}/> Remove Subject</button></td>  
                            </tr>
                          })}
                        </tbody>
                      </table>
                      <input type="text" id='subject-input2' placeholder='subject name' style={{outline : 'none', letterSpacing : '1px', border : "none", borderBottom : "2px solid black", width : '70%'}} onChange={(e)=>{setSubject(e.target.value)}} className="p-2 mt-3"/>
                      <button className='btn btn-sm btn-outline-success mt-2' style={{marginLeft : '20px'}} onClick={subjectAddArray}><PlusCircleFill style={{fontSize : '1.3rem', paddingRight : '2px'}}/> Add Subject</button>
                    </div>
                  )}
                  </div>
                </div>
              </div>
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
              <button className='btn btn-md btn-primary mt-5' onClick={addTeacher} style={{marginLeft : '20px'}}>Add Teacher</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTeachers