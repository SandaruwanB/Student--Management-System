import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowBarLeft, CloudArrowUpFill,PlusCircleFill } from 'react-bootstrap-icons'
import axios from 'axios';
import jsCookies from 'js-cookies';
import {toast, ToastContainer} from 'react-toastify'

const EditStudent = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [status,setStatus] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [index, setIndex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [attendYear, setAttendYear] = useState("");
  const [attendGrade, setAttendGrade] = useState(0);
  const [leaveYear, setLeaveYear] = useState("");
  const [parent, setParent] = useState("");
  const [parentcontact, setParentContact] = useState("");
  const [subjectsAndResults, setSubjectsAndResults] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [file, setFile] = useState();
  const [subject, setSubject] = useState("");
  const [mark,setMark] = useState("");
  const [grade,setGrade] = useState("");

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

  axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
  axios.get("http://localhost:8080/students/" + id).then(res=>{
    setCertificates(res.data.student.certificates);
    setSubjectsAndResults(res.data.student.subjectsandmarks);
  });

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/students/" + id).then(res=>{
      if(res.data.result === "success" ){
        setFirstName(res.data.account.firstname);
        setLastName(res.data.account.lastname);
        setEmail(res.data.account.email);
        setFullName(res.data.student.fullname);
        setIndex(res.data.student.indexnumber);
        setBirthday(res.data.student.birthday);
        setGender(res.data.student.gender);
        setAddress(res.data.student.address);
        setContact(res.data.student.studentcontact);
        setAttendYear(res.data.student.attendyear);
        setAttendGrade(res.data.student.attendgrade);
        setLeaveYear(res.data.student.leavedate);
        setParent(res.data.student.parentname);
        setParentContact(res.data.student.parentcontact);
      }
      else if(res.data.result === 'notFound'){
        setFirstName(res.data.account.firstname);
        setLastName(res.data.account.lastname);
        setEmail(res.data.account.email);
      }
      else{
        setStatus(false);
      }
    });
  },[setFirstName,setLastName,setEmail,setFullName,setIndex,setBirthday,setGender,setAddress,setContact,setAttendYear,setAttendGrade,setLeaveYear,setParent,setParentContact,setSubjectsAndResults,setStatus]);



  const updatePersonalData = ()=>{
    if(firstname === "" || lastname === "" || email === "" || index === "" || fullname === "" || birthday === "" || gender === "" || address === "" || contact === "" || attendYear === "" || attendGrade === "" || parent === "" || parentcontact === ""){
      showAlert("All Fields are Required");
    }
    else{
      axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem("token");
      axios.post("http://localhost:8080/student/update", {
        userid : id,
        firstname : firstname,
        lastname : lastname,
        email : email, 
        index : index,
        fullname : fullname,
        birthday : birthday,
        gender : gender,
        address : address,
        contact : contact,
        attendGrade : attendGrade,
        attendYear : attendYear,
        leaveYear : leaveYear,
        parent : parent,
        parentcontact : parentcontact
      }).then(res=>{
        if(res.data.result === "email"){
          showAlert("This Email Address Already Taken From Another User.")
        }
        else if(res.data.result === "success"){
          showSuccess("Successfully Updated");
        }
      })
    }
  }

  const saveCertificate = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    formData.append('student', id);
    axios.post("http://localhost:8080/file/upload", formData).then(res=>{
      if(res.data.result === 'success'){
        showSuccess("Successfully Updated");
      }
      else if(res.data.result === 'have'){
        showAlert("This file allready exists please rename to upload it.")
      }
      else{
        setStatus(false);
      }
    })
  }


  const goBack = ()=>{
    navigate(-1);
  }

  const viewFile = (file)=>{
    window.open('/uploads/' + file, '_blank');
  }

  const removeCertificate = (file)=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.post('http://localhost:8080/removefile',{
      file : file,
      id : id
    }).then(res=>{
      if(res.data.result === 'success'){
        showSuccess("Successfully Removed");
      }
      else{
        jsCookies.removeItem('token');
        navigate('/');
      }
    });
  }

  const addSubjectsAndMarks = ()=>{
    if(grade === "" || subject === "" || mark === ""){
      showAlert("All Fields are Required.");
    }
    else{
      axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
      axios.post('http://localhost:8080/setsubjects',{
        id : id,
        subject : subject,
        grade : grade,
        mark : mark
      }).then(res=>{
        if(res.data.result === "success"){
          showSuccess("Successfully Added");
        } 
        else{
          jsCookies.removeItem('token');
          navigate('/');
        }
      })
    }
  }

  const removeSubject = (subid)=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.post("http://localhost:8080/removesubject",{subid : subid, userid : id}).then(res=>{
      if(res.data.result === 'success'){
        showSuccess("Successfully Removed");
      }
      else{
        jsCookies.removeItem('token');
        navigate('/');
      }
    })
  }

  return (
    <div>
      <div className="text-center mt-5">
        <h3 style={{color : 'rgb(17, 20, 54)'}}>Edit Student Data</h3>
      </div>
      <div className="container mt-5">
        <button className='btn btn-md btn-info text-light' onClick={goBack}><ArrowBarLeft style={{fontSize: '1.6rem'}}/> Go Back</button>
        <div className="mt-5">
          <span>Student Details</span>
          <hr />
        </div>
        <div className="row mt-5">
          <div className="mx-auto col-lg-10 col-md-10 col-sm-12">
            <div className="row">
              <div className="col">
                <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} className='form-control' placeholder='first name' />
                <span style={{marginLeft : '10px'}}>First Name</span>
              </div>
              <div className="col">
                <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} placeholder='last name' className='form-control' />
                <span style={{marginLeft : '10px'}}>Last Name</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email address' className='form-control'/>
                <span style={{marginLeft : '10px'}}>Email Address</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="text" value={index} onChange={(e)=>setIndex(e.target.value)} placeholder='index number' className='form-control'/>
                <span style={{marginLeft : '10px'}}>Index Number</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="text" placeholder='full name' value={fullname} onChange={(e)=>setFullName(e.target.value)} className='form-control' />
                <span style={{marginLeft : '10px'}}>Full Name</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="date" value={birthday} onChange={(e)=>setBirthday(e.target.value)} className="form-control" />
                <span style={{marginLeft : '10px'}}>Birthday</span>
              </div>
              <div className="col">
                  <select className='form-select' onChange={(e)=>setGender(e.target.value)}>
                    <option>Select</option>
                    <option value="male" defaultValue={gender === "male" ? true : false}>Male</option>
                    <option value="female" defaultValue={gender === "female" ? true : false}>Female</option>
                  </select>
                  <span style={{marginLeft : '10px'}}>Gender</span>
                </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="text" className='form-control' placeholder='address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <span style={{marginLeft : '10px'}}>Address</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="text" className='form-control' value={contact} onChange={(e)=>setContact(e.target.value)} placeholder='contact number' />
                <span style={{marginLeft : '10px'}}>Contact Number</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="date" className='form-control' placeholder='attend year' value={attendYear} onChange={(e)=>setAttendYear(e.target.value)} />
                <span style={{marginLeft : '10px'}}>Attend Date</span>
              </div>
              <div className="col">
                <input type="number" className='form-control' placeholder='attend grade' value={attendGrade} onChange={(e)=>setAttendGrade(e.target.value)}/>
                <span style={{marginLeft : '10px'}}>Attend Grade</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="date" className='form-control' placeholder='leave date' value={leaveYear} onChange={(e)=>setLeaveYear(e.target.value)}/>
                <span style={{marginLeft : '10px'}}>Leave Date</span>
              </div>
              <div className="col"></div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input type="text" className='form-control' placeholder='parent name' value={parent} onChange={(e)=>setParent(e.target.value)}/>
                <span style={{marginLeft : '10px'}}>Parent Name</span>
              </div>
              <div className="col">
                <input type="text" className='form-control' placeholder='parent contact number' value={parentcontact} onChange={(e)=>setParentContact(e.target.value)}/>
                <span style={{marginLeft : '10px'}}>Parent Contact Number</span>
              </div>
            </div>
            <button className='btn btn-sm btn-success mt-4 mb-4' onClick={updatePersonalData}>Update Personal Data</button>
          </div>
        </div>
        <div className="mt-5">
          <span>Subjects and Results</span>
          <hr />
        </div>
        <div className="container mb-5 w-75">
          {subjectsAndResults.length > 0 ? (
              <div className="mt-5">
                <table className='table text-center'>
                  <thead>
                    <tr>
                      <th scope='col'>Subject</th>
                      <th scope='col'>Grade</th>
                      <th scope='col'>Mark</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectsAndResults.map((value,index)=>{
                      return <tr key={index}>
                        <td>{value.subjectname}</td>
                        <td>Grade {value.grade}</td>
                        <td>{value.mark}</td>
                        <td><button className='btn btn-sm btn-outline-danger' onClick={(e)=>removeSubject(value._id)}>Remove</button></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
          ):(
            <div className="text-center alert alert-info">
              No Results Found
            </div>
          )}
          <div className="mt-5 gx-2 row">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <input type="text" className='form-control' onChange={(e)=>setSubject(e.target.value)} placeholder='Subject'/>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3">
              <input type="number" placeholder='Grade' onChange={(e)=>setGrade(e.target.value)} className='form-control'/>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3">
              <input type="number" placeholder='Marks' onChange={(e)=>setMark(e.target.value)} className='form-control'/>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3">
              <button className="btn btn-sm btn-outline-success" onClick={addSubjectsAndMarks}><PlusCircleFill style={{fontSize : '1.2rem'}}/>&nbsp;&nbsp;Add</button>              
            </div>
          </div>
        </div>
        <div className="mt-5">
          <span>Certifications</span>
          <hr />
        </div>
        <div className="container mb-5">
          <div className="row mt-1">
            <div>
          {certificates.length > 0 ? (

              <div className="row">
              {certificates.map((value,index)=>{
                return <div key={index} className="col-sm-6 col-md-3 col-lg-2 mt-4">
                    <div>
                        <div className="text-center p-2">               
                          <embed src={'/uploads/' + value} width={80} height={80}></embed>
                          <h6 className='mt-1'>{value}</h6>
                          <button className='btn btn-sm btn-outline-info' onClick={(e)=>viewFile(value)}>view</button>&nbsp;&nbsp;<button onClick={(e)=>removeCertificate(value)} className="btn btn-sm btn-outline-danger">remove</button>
                        </div>
                    </div>
                </div>
              })}
            </div>
          ):(
            <div>
              <div className="row">
                <div className="col">
                  <div className="alert alert-warning text-center col-md-offset-4">No Certificates Found</div>
                </div>
              </div>
            </div>
          )}
              <div className="row mt-2">
                <div className="col">
                  <input type="file" placeholder='add certificate' onChange={(e)=>setFile(e.target.files[0])} className='form-control'/>
                </div>
                <div className="col">
                  <button className='btn btn-sm btn-outline-success mt-2' onClick={saveCertificate}><CloudArrowUpFill style={{fontSize : '1.5rem'}}/>&nbsp;&nbsp; Update Certificate</button>
                </div>
              </div>
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
      </div>
    </div>
  )
}

export default EditStudent