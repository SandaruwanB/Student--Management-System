import React, { useEffect, useState } from 'react'
import StudentNav from '../layouts/studentNav'
import { useNavigate } from 'react-router-dom'
import jsCookies from 'js-cookies'
import axios from 'axios'

const StudentInfo = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState([]);
  const [student,setStudent] = useState([]);
  const [status, setStatus] = useState(true);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/student").then(res=>{
      if(res.data.result === "success"){
        setUser(res.data.user);
        setStudent(res.data.student);
      }
      else{
        setStatus(false);
      }
    })
  },[setStatus,setStudent,setUser]);

  return (
    <div>
      <StudentNav/>
      <div className="container">
        <div className="text-center mt-5">
          <h1>Your Information</h1>
          <span>This shows your all Information.If it's not show your all the details don't worry it will apear hear.</span>
        </div>
        <div className="mt-5">
          <span>Account Details</span>
          <hr />
        </div>
        <table className='table mt-5 w-75' style={{marginLeft : '12.5%'}}>
          <tbody>
            <tr>
              <th>First Name</th>
              <td>{user.firstname}</td>
              <th>Last Name</th>
              <td>{user.lastname}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td colSpan={4}>{user.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5">
          <span>Other Details</span>
          <hr />
        </div>
        {student !== null ? (
          <table className='table mt-5 w-75' style={{marginLeft : '12.5%'}}>
            <tbody>
              <tr>
                <th>Index Number</th>
                <td colSpan={3}>{student.indexnumber}</td>
              </tr>
              <tr>
                <th>Full Name</th>
                <td colSpan={3}>{student.fullname}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{student.gender}</td>
                <th>Birthday</th>
                <td>{student.birthday}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td colSpan={3}>{student.address}</td>
              </tr>
              <tr>
                <th>Contact</th>
                <td colSpan={3}>{student.studentcontact}</td>
              </tr>
              <tr>
                <th>Attend Year</th>
                <td>{student.attendyear}</td>
                <th>Attend Grade</th>
                <td>Grade {student.attendgrade}</td>
              </tr>
              <tr>
                <th>Left Year</th>
                <td colSpan={3}>{student.leavedate === "" ? "Still in School" : student.leavedate}</td>
              </tr>
              <tr>
                <th>Parent Name</th>
                <td>{student.parentname}</td>
                <th>Parent Contact</th>
                <td>{student.parentcontact}</td>
              </tr>
            </tbody>
          </table>
        ): (
          <div className="alert alert-info text-center">
            Sorry This data not yet updated. please be in touch.
          </div>
        )}

      </div>
    </div>
  )
}

export default StudentInfo