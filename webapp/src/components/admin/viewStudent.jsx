import axios from 'axios';
import jsCookies from 'js-cookies';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {ArrowBarLeft, PersonFill, EnvelopeFill, TelephoneFill, GeoAltFill} from 'react-bootstrap-icons'
import {Backdrop, CircularProgress} from '@mui/material'
import {toast, ToastContainer} from 'react-toastify'
import QRCode from 'qrcode.react'

const ViewStudentData = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(true);
    const [userData, setUserData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [leftDate, setLeftDate] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [result, setResult] = useState([]);

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

    useEffect(()=>{
        const token = jsCookies.getItem('token');
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        axios.get("http://localhost:8080/student/" + id).then(res=>{
            if(res.data.result === "notFound"){
                setData(false);
            }
            else if(res.data.result === "success"){
                setUserData(res.data.account);
                setStudentData(res.data.student);
                setCertificates(res.data.student.certificates);
                setResult(res.data.student.subjectsandmarks);
            }
            else{
                jsCookies.removeItem('token');
                navigate("/");
            }
        });
        setTimeout(()=>{
            setIsLoading(false);
        },800);
    });

    const markLeaveFormSubmit = ()=>{
        if(leftDate === ""){
            document.getElementById('leftDateInput').style.border = '2px solid red';
        }
        else{
            document.getElementById('leftDateInput').style.border = 'none';
            axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
            axios.post('http://localhost:8080/student/left', {
                userID : id,
                leftDate : leftDate
            }).then(res=>{
                if(res.data.result === "success"){
                    document.getElementById('markLeaveForm').classList.add('d-none');
                    showSuccess("Successfully Changed");
                }
                else{
                    jsCookies.removeItem('token');
                    navigate('/');
                }
            });
        }
    }

    const goback = ()=>{
        navigate('/admin/students');
    }

    const markLeaveFormOpen = ()=>{
        document.getElementById('markLeaveForm').classList.remove('d-none');
    }
    const markLeaveFormClose = ()=>{
        document.getElementById('markLeaveForm').classList.add('d-none');
    }

    const downlodaQR = ()=>{
        const qrURL = document.getElementById('stuqrcode').toDataURL("image/png").replace("image/png");
        let ael = document.createElement('a');
        ael.href = qrURL;
        ael.download = userData.firstname + "QR.png";
        document.body.appendChild(ael);
        ael.click();
        document.body.removeChild(ael);
    }
    
    const viewFile = (file)=>{
        window.open('/uploads/' + file, '_blank');
    }
    
    return (
    <div>
        {isLoading ? (
            <Backdrop sx={{color: '#fff', zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
                <CircularProgress color='inherit'/>
            </Backdrop>
        ): ("")}
        <div className="container mb-5">
            <button className='btn btn-md btn-info mt-5 text-light' title='go to back' onClick={goback}><ArrowBarLeft style={{fontSize : '2rem'}}/> Go Back</button>
            {data ? (
                <div className="row mt-5">
                    <hr/>
                    <div className="row">
                        <div className="mx-auto col-12 col-sm-12 col-lg-6">
                            <div className="row">
                                <div className="col-7 p-4">
                                    <div className="d-block">
                                        <PersonFill style={{fontSize : '1.2rem', color : 'green'}}/> <span style={{marginLeft : '12px'}}>{userData.firstname + " " + userData.lastname}</span>
                                    </div>
                                    <div className="d-block mt-2">
                                        <EnvelopeFill style={{fontSize : '1.2rem',color : 'green'}}/> <span style={{marginLeft : '12px'}}>{userData.email}</span>
                                    </div>
                                    <div className="d-block mt-2">
                                        <TelephoneFill style={{fontSize : '1.2rem',color : 'green'}}/> <span style={{marginLeft: '12px'}}>{studentData.studentcontact}</span>
                                    </div>
                                    <div className="d-block mt-2">
                                        <GeoAltFill style={{fontSize : '1.2rem',color : 'green'}}/> <span style={{marginLeft : '12px'}}>{studentData.address}</span>
                                    </div>
                                </div>
                                <div className="col-5">
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto col-12 col-sm-12 col-lg-6">
                            <div className="row">
                                <div className="col-7 text-center">
                                    <h4 style={{marginTop : '12%'}}>Student's QR Code</h4>
                                    <button className='mt-2 btn btn-sm btn-success' onClick={downlodaQR}>Download</button>
                                </div>
                                <div className="col-5 p-2">
                                    <QRCode imageSettings={{x : 5, y : 5}} level={'H'} includeMargin={true} id='stuqrcode' size={150} value={userData._id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='mt-3'/>
                    <div className="row mt-3">
                        <div className="mx-auto col-12 col-sm-12 col-lg-6 p-5">
                            <h5 className='text-center'>Student's Personal Data</h5>
                            <table className="table mt-5">
                                <tbody>
                                    <tr>
                                        <th>First Name</th>
                                        <td>{userData.firstname}</td>
                                    </tr>
                                    <tr>
                                        <th>Last Name</th>
                                        <td>{userData.lastname}</td>
                                    </tr>
                                    <tr>
                                        <th>Full Name</th>
                                        <td>{studentData.fullname}</td>
                                    </tr>
                                    <tr>
                                        <th>Birthday</th>
                                        <td>{studentData.birthday}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender</th>
                                        <td>{studentData.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Contact Number</th>
                                        <td>{studentData.studentcontact}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{studentData.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Address</th>
                                        <td>{userData.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Parent Name</th>
                                        <td>{studentData.parentname}</td>
                                    </tr>
                                    <tr>
                                        <th>Parent Contact Number</th>
                                        <td>{studentData.parentcontact}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mx-auto col-12 col-sm-12 col-lg-6 p-5">
                            <h5 className='text-center'>Student's School Data</h5>
                            <table className="table mt-5">
                                <tbody>
                                    <tr>
                                        <th>Index Number</th>
                                        <td>{studentData.indexnumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Grade</th>
                                        <td>{}</td>
                                    </tr>
                                    <tr>
                                        <th>Attend Date</th>
                                        <td>{studentData.attendyear}</td>
                                    </tr>
                                    <tr>
                                        <th>Attend Grade</th>
                                        <td>Grade {studentData.attendgrade}</td>
                                    </tr>
                                    <tr>
                                        <th>Leave Date</th>
                                        <td>{studentData.leavedate === "" ?  <button onClick={markLeaveFormOpen} className="btn btn-sm btn-danger" data-toggle="modal" data-target="#markStudentLeft">Mark as Leaved</button> : studentData.leavedate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr className="mt-1" />
                    <div className="text-center">
                        <h5 className="mt-2">Student Marks Details</h5>
                        <div className="mt-5">
                            {result.length > 0 ? (
                                <div>
                                    <table className='table text-center'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Subject</th>
                                                <th scope='col'>Grade</th>
                                                <th scope='col'>Mark</th>
                                                <th scope='col'>Obtained Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.map((value,index)=>{
                                                return <tr key={index}>
                                                    <td>{value.subjectname}</td>
                                                    <td>Grade {value.grade}</td>
                                                    <td>{value.mark}%</td>
                                                    <td>{value.mark >= 90 ? "A+" : value.mark >= 75 ? "A" : value.mark >= 65 ? "B" : value.mark >= 55 ? "C" : value.mark >= 35 ? "S" : "F"}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>

                                </div>
                            ): (
                                <div className="alert alert-info">
                                    No Data Found
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="mt-5" />
                    <div className="text-center">
                        <h5 className='mt-2'>Certifications</h5>
                        <div className="mt-5">
                            {certificates.length > 0 ? (
                                <div className="row mt-4">
                                    {certificates.map((value,index)=>{
                                        return <div key={index} className="col-sm-12 col-md-4 col-lg-3 p-2" style={{border : '2px solid #000', borderRadius : '10px', marginRight : '15px'}}>
                                            <embed src={"/uploads/" + value} width={150} height={160}/>
                                            <div className="text-center mt-2">
                                                <h6>{value}</h6>
                                                <button className='btn btn-sm btn-success' onClick={(e)=>viewFile(value)}>View</button>
                                            </div>
                                        </div>
                                    })}
                                </div>

                            ):(
                                <div className="alert alert-danger">No Results Found</div>
                            )}
                        </div>
                    </div>
                </div>
            ): (
            <div className='mt-5'>
                <div className="alert alert-info text-center">
                    No Student Data to Show.Please add Data.
                </div>
                <div className="text-center">
                    <button className='btn btn-md btn-success' onClick={(e)=>navigate('/admin/students/edit/' + id)}>Add Student Data</button>
                </div>
            </div>
            )}

        </div>
        <div className='d-none' id='markLeaveForm' style={{position: 'absolute', top : 0, left : 0, height : '100vh', width : '100%', background : 'rgba(0,0,0,0.5)', display : 'flex', justifyContent : 'center', alignItems : 'center', transition : '.5s ease-in'}}>
            <div style={{background : '#fff', width : '400px', height : '230px'}}>
                <div className='mt-1 p-4'>
                    <span>Which Date he/she Left the School ? </span>
                    <hr />
                    <input className='form-control' id='leftDateInput' type="date" onChange={(e)=>{setLeftDate(e.target.value)}}/>
                </div>
                <div className="text-center mt-2" >
                    <button className='btn btn-sm btn-success' onClick={markLeaveFormSubmit} style={{marginRight : '10px'}}>Done</button>
                    <button className='btn btn-sm btn-danger' onClick={markLeaveFormClose}>Cancel</button>
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
  )
}

export default ViewStudentData