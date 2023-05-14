import React, { useState, useEffect } from 'react'
import TeacherNav from '../layouts/teacherNav'
import jsCookies from 'js-cookies'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TeacherDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [status,setStatus] = useState(true);
  const [subjects,setSubjects] = useState([]);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/teacher").then(res=>{
      if(res.data.result === "success"){
        setUser(res.data.user);
        setTeacher(res.data.teacher);
        setSubjects(res.data.teacher.subjects);
      }
      else{
        setStatus(false);
      }
    })
  },[setStatus,setUser,setTeacher]);
  
  return (
    <div>
      <TeacherNav/>
      <div className="container mt-5">
        <div className="text-center">
          <h1>Your Details</h1>
          <span>This Shows Your subjects and every details about you if their any issue please contact admin.</span>
        </div>
        <div className="mt-5">
          <span>Personal Details</span>
          <hr />
          <div className="row w-75 mx-auto">
            <div className="col-sm-12 col-md-12 col-lg-12 mt-5">
              <table className='table'>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{user.firstname}</td>
                    <th>Last Name</th>
                    <td>{user.lastname}</td>
                  </tr>
                  <tr>
                    <th>Full Name</th>
                    <td colSpan={3}>{teacher.fullname}</td>
                  </tr>
                  <tr>
                    <th>Birthday</th>
                    <td>{teacher.birthday}</td>
                    <th>Gender</th>
                    <td>{teacher.gender}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td colSpan={3}>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td colSpan={3}>{teacher.address}</td>
                  </tr>
                  <tr>
                    <th>Contact</th>
                    <td colSpan={3}>{teacher.contact}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5">
            <span>Subjects</span>
            <hr />
            <div className="row w-50 mx-auto">
              <div className="col-sm-12 col-md-12 col-lg-12 mt-5">
                <table className='table col-md-6 col-lg-6 col-sm-12'>
                  <thead>
                    <tr>
                      <th className='text-center'>#</th>
                      <th className='text-center'>Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <th className='text-center' scope='row'>All</th>
                        <td className='text-center'>{subjects}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDetails