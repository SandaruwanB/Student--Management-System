import React, { useEffect, useState } from 'react'
import StudentNav from '../layouts/studentNav'
import { Link, useNavigate } from 'react-router-dom'
import { BoxArrowUpRight, Quote } from 'react-bootstrap-icons'
import jsCookies from 'js-cookies'
import axios from 'axios'

const StudentHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState(true);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');;
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/student").then(res=>{
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
      <StudentNav/>
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h1 className='text-center'>Welcome {user.firstname}!</h1>
          <span className='text-center'>Welcome back and you can view all the details of your subject works and results also certifications</span>          
        </div>
        <div className="row gx-5 mt-5">
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <Link to={"/student/details"} style={{textDecoration : 'none'}}>
              <div className="shortcut text-center p-2">  
                <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                <h6 className='mt-3'>My Info</h6>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <Link to={"/student/certifaces"} style={{textDecoration : 'none'}}>
              <div className="shortcut text-center p-2">  
                <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                <h6 className='mt-3'>My Certificates</h6>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
            <Link to={"/student/result"} style={{textDecoration : 'none'}}>
              <div className="shortcut text-center p-2">  
                <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                <h6 className='mt-3'>Result Details</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-5 text-center">
          <h6 className='w-50' style={{marginLeft : '25%',marginTop : '100px',fontStyle : 'italic'}}><Quote/>&nbsp;<span style={{fontSize : '1.2rem',letterSpacing : '1px'}}>No matter how many times you fail, always get straight back up and try again. Trust yourself to succeed eventually. Even if it took you a little longer than usual, you’ll get there. Instead of giving up, find patience within yourself and give yourself the time you need.&nbsp;<Quote/></span></h6>
        </div>
      </div>
    </div>
  )
}

export default StudentHome