import React, { useEffect, useState } from 'react'
import {Backdrop, CircularProgress} from '@mui/material'
import {ArrowBarLeft} from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jsCookies from 'js-cookies'

const ViewTeacherData = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [state, setStatus] = useState(true);

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get('http://localhost:8080/teachers/' + id).then(res=>{
      if(res.data.result === "success"){
        setUserData(res.data.account);
        setTeacherData(res.data.teacher);
      }
      else{
        setStatus(false);
      }
    })

    setTimeout(()=>{
      setIsLoading(false);
    },700); 
  })

  if(state === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  const goback = ()=>{
    navigate('/admin/teachers');
  }

  return (
    <div>
      {isLoading ? (
        <Backdrop sx={{color: '#fff', zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
          <CircularProgress color='inherit'/>
        </Backdrop> 
      ):("")}

      <div className="container mb-5">
        <button className='btn btn-md btn-info mt-5 text-light' title='go to back' onClick={goback}><ArrowBarLeft style={{fontSize : '2rem'}}/> Go Back</button>
        <hr />
        <div className="row mt-3">
          <div className="mx-auto col-12 col-sm-12 col-lg-6 p-5">
            <h5 className='text-center'>Teacher's Information</h5>
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
                  <td>{teacherData.fullname}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{teacherData.gender}</td>
                </tr>
                <tr>
                  <th>Birthday</th>
                  <td>{teacherData.birthday}</td>
                </tr>
                <tr>
                  <th>Email Address</th>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{teacherData.address}</td>
                </tr>
                <tr>
                  <th>Contact Number</th>
                  <td>{teacherData.contact}</td>
                </tr>
                <tr>
                  <th>Teaching Subjects</th>
                  <td>
                    {teacherData.subjects + "   "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTeacherData