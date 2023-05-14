import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {ArrowBarLeft } from 'react-bootstrap-icons'
import axios from 'axios';
import jsCookies from 'js-cookies';
import { PlusCircleFill, XCircleFill} from 'react-bootstrap-icons'
import {toast, ToastContainer} from 'react-toastify'

const EditTeachers = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [firstname, setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthDay] = useState(Date);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [status, setStatus] = useState(true);
 
  useEffect(()=>{
      axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
      axios.get("http://localhost:8080/teachers/" + id).then(res=>{
        if(res.data.result === "success"){
          setSubjects(res.data.teacher.subjects);
          setFirstName(res.data.account.firstname);
          setLastName(res.data.account.lastname);
          setEmail(res.data.account.email);
          setFullName(res.data.teacher.fullname);
          setGender(res.data.teacher.gender);
          setBirthDay(res.data.teacher.birthday);
          setAddress(res.data.teacher.address);
          setContact(res.data.teacher.contact);
        }
        else{
          setStatus(false);
        }
      });
  },[setSubjects,setFirstName,setLastName,setEmail,setFullName,setGender,setBirthDay,setAddress]);

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


  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
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

  const updateTeacher = ()=>{
    if(firstname === "" || lastname === "" || email === "" || fullname === "" || gender === "" || birthday === "" || address === "" || contact === "" ){
      showAlert("Some Required Fields are Missed");
    }
    else if(subjects.length > 0){
      axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem("token");
      axios.post('http://localhost:8080/teacher/update',{
        userid : id,
        firstname : firstname,
        lastname : lastname,
        email : email,
        fullname : fullname,
        gender : gender,
        birthday : birthday,
        address : address,
        contact : contact,
        subjects : subjects
      }).then(res=>{
        if(res.data.result === "success"){
          showSuccess("Successfully Updated");
        }
        else{
          jsCookies.removeItem("token");
          navigate('/');
        }
      })
    }
    else{
      showAlert("Subjects Cannot be Empty");
    }
  }

  return (
    <div>
      <div className="text-center mt-5">
        <h3 style={{color : 'rgb(17, 20, 54)'}}>Teacher Account Details</h3>
      </div>
      <div className="container">
        <div className="mb-4" style={{marginTop : '70px'}}>
          <Link to={"/admin/teachers"}><button className='btn btn-md btn-info text-light'><ArrowBarLeft style={{fontSize: '1.6rem'}}/> Go Back</button></Link>
        </div>
        <h6>Account And Personal Details</h6>
        <hr />
        <div className="row mt-3 mb-5">
          <div className="mx-auto col-12 col-md-10 col-lg-8">
            <div className="container mx-auto mt-4">
              <div className="row">
                <div className="col">
                  <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} className='form-control' placeholder='first name'/>
                  <span style={{marginLeft: '10px'}}>First Name</span>
                </div>
                <div className="col">
                  <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} className='form-control' placeholder='last name'/>
                  <span style={{marginLeft: '10px'}}>Last Name</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' className="form-control" />
                  <span style={{marginLeft: '10px'}}>Email Address</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input type="text" placeholder='full name' value={fullname} onChange={(e)=>setFullName(e.target.value)} className="form-control" />
                  <span style={{marginLeft: '10px'}}>Full Name</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <select className='form-select' onChange={(e)=>setGender(e.target.value)}>
                    <option>Select</option>
                    <option value="male" defaultValue={gender === "male" ? true : false}>Male</option>
                    <option value="female" defaultValue={gender === "female" ? true : false}>Female</option>
                  </select>
                  <span style={{marginLeft : '10px'}}>Gender</span>
                </div>
                <div className="col">
                  <input type="date" value={birthday} onChange={(e)=>setBirthDay(e.target.value)} placeholder='birthday' className='form-control'/>
                  <span style={{marginLeft : '10px'}}>Birthday</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input type="text" placeholder='address' value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" />
                  <span style={{marginLeft : '10px'}}>Address</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input type="text" placeholder='contact number' value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control" />
                  <span style={{marginLeft : '10px'}}>Contact Number</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <span style={{marginLeft : '10px'}}>Subjects</span>
                  {subjects.length > 0 ? (
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
                  ): (
                    <div>
                      <input type="text" id='subject-input1' placeholder='subject name' style={{outline : 'none', letterSpacing : '1px', border : "none", borderBottom : "2px solid black", width : '70%'}} onChange={(e)=>{setSubject(e.target.value)}} className="p-2"/>
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
            <button className='btn btn-md btn-primary mt-5' onClick={updateTeacher} style={{marginLeft : '20px'}}>Update Teacher Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTeachers