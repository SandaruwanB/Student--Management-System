import React, { useEffect, useState } from 'react'
import TeacherNav from '../layouts/teacherNav'
import axios from 'axios'
import jsCookies from 'js-cookies'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BoxArrowUpRight, Quote } from 'react-bootstrap-icons'

const TeacherHome = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState([]);
  const [status, setStatus] = useState(true);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/teacher").then(res=>{
      if(res.data.result === "success"){
        setUser(res.data.user);
      }
      else{
        setStatus(false);
      }
    })
  },[setStatus,setUser]);

  return (
    <div>
      <TeacherNav/>
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h1 className='text-center'>Welcome Back {user.firstname}!</h1>
          <span className='text-center'>Welcome back, sure you're doing well. you can use below shortcuts to navigate to other places.</span>          
        </div>
        <div className="row gx-5 mt-5">
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <Link to={"/teacher/students"} style={{textDecoration : 'none'}}>
              <div className="shortcut text-center p-2">  
                <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                <h6 className='mt-3'>Students</h6>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <Link to={"/teacher/scan"} style={{textDecoration : 'none'}}>
              <div className="shortcut text-center p-2">  
                <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                <h6 className='mt-3'>Scan Student QR</h6>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <Link to={"/teacher/details"} style={{textDecoration : 'none'}}>
              <div className="shortcut text-center p-2">  
                <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                <h6 className='mt-3'>My Details</h6>
              </div>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="mt-5 text-center">
            <h6 className='w-50' style={{marginLeft : '25%',marginTop : '100px',fontStyle : 'italic'}}><Quote/>&nbsp;<span style={{fontSize : '1.2rem',letterSpacing : '1px'}}>Every child deserves a champion—an adult who will never give up on them, who understands the power of connection and insists that they become the best that they can possibly be.&nbsp;<Quote/></span></h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherHome