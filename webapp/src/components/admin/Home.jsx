import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar';
import { Backdrop, CircularProgress } from  '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { BoxArrowUpRight } from 'react-bootstrap-icons'
import axios from 'axios'
import jsCookies from 'js-cookies'


const AdminHome = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState(true);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/recentstudents").then(res=>{
      if(res.data.result === "success"){
        setStudents(res.data.student);
      }
      else{
        setStatus(false);
      }
    },[setStatus,setStudents])

    setTimeout(()=>{
      setIsLoading(false);
    },700)
  },[setIsLoading]);

  
  return (
    <div>
      {isLoading ? (
        <Backdrop sx={{color: '#fff', zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
          <CircularProgress color='inherit'/>
        </Backdrop>
      ): ("")}
      <Navbar/>
      <div className="container-fluid">
        <div className="content mt-5">
          <nav aria-label="breadcrumb" style={{marginLeft: '5%'}}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">Home</li>
              <li className="breadcrumb-item active" aria-current="page"></li>
            </ol>
          </nav>
          <div className="mt-5">
            <div className='container'>Shortcuts</div>
            <hr />
            <div className="container">
              <div className="row">
                <div className="mx-auto"></div>
                  <div className="row gx-5 mx-auto">
                    <div className="col-sm-12 col-md-4 col-lg-3 mt-4">
                      <Link to={"/admin/students"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Students</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                      <Link to={"/admin/teachers"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">                  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Teachers</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                      <Link to={"/admin/admins"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">                  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Admins</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                      <Link to={"/admin/scan"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">                  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Scan QR Code</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                      <Link to={"/admin/students/add"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">                  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Add Student</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                      <Link to={"/admin/teachers/add"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">                  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Add Teacher</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                      <Link to={"/admin/admins/add"} style={{textDecoration : 'none'}}>
                        <div className="shortcut text-center p-2">                  
                          <BoxArrowUpRight style={{fontSize : '1.5rem'}}/>
                          <h6 className='mt-3'>Add Admin</h6>
                        </div>
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="container">Recent Students</div>
              <hr />
              <div className="container">
                <table className="table table-sm text-center table-striped mt-5">
                  <thead style={{background : 'rgb(225, 234, 250)'}}>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>First Name</th>
                      <th scope='col'>Last Name</th>
                      <th scope='col'>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? students.map((row,index)=>{
                      return <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{row.firstname}</td>
                        <td>{row.lastname}</td>
                        <td>{row.email}</td>
                      </tr>
                    }) : 
                    (
                      <tr>
                        <td colSpan={4}>No Students Found</td>
                      </tr>
                    )}

                    <tr>
                      <td colSpan={4}><Link to={"/admin/students"} style={{textDecoration : 'none'}}>Show All Student Details</Link></td>
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

export default AdminHome