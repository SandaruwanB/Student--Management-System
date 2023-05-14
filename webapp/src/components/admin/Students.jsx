import React, { useEffect, useState } from 'react'
import {Trash3Fill,Folder2Open,PencilSquare } from 'react-bootstrap-icons'
import Navbar from '../layouts/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import jsCookies from 'js-cookies'
import {Backdrop, CircularProgress} from '@mui/material'
import {ToastContainer, toast} from 'react-toastify'

const AdminStudents = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [selectall,setSelectAll] = useState(false);

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

  axios.get('http://localhost:8080/students').then(res=>{
    setStudentData(res.data.data);
  });
  
  useEffect(()=>{
    const delToken = jsCookies.getItem("del");
    if(delToken){
      jsCookies.removeItem('del');
      showSuccess("Successfully Deleted");
    }


    setTimeout(()=>{
      setIsLoading(false);
    },600);
  },[setStudentData]);


  const deleteStudent = (id)=>{
    navigate('/admin/students/delete/' + id);
  }

  const editStudent = (id)=>{
    navigate('/admin/students/edit/' + id);
  }

  const viewStudent = (id)=>{
    navigate('/admin/students/view/' + id);
  }

  const checkSubject = (e)=>{
    const id = e.target.value;
    const chekval = checked.find(userid=>userid === id);
    if(chekval){
      const temp = [...checked];
      temp.splice(id,1);
      setChecked(temp);
    }else{
      setChecked(oldArray=>[
        ...oldArray,
        id
      ])
    }
  }

  const selectAll = ()=>{
    setSelectAll(!selectall);
    setChecked([]);
  }

  const deleteSelected = ()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem("token");
    if(selectall){
      axios.post("http://localhost:8080/students/delete/selected", {
        data : "all"
      }).then(res=>{
        if(res.data.result === "success"){
          showSuccess("Successfully Removed.");
          setChecked([]);
          setSelectAll(false)
        }
        else{
          jsCookies.removeItem("token");
          navigate("/");
        }
      })
    }
    else{
      axios.post("http://localhost:8080/students/delete/selected", {
        data : checked
      }).then(res=>{
        if(res.data.result === "success"){
          showSuccess("Successfully Removed");
          setChecked([]);
          setSelectAll(false)
        }
        else{
          jsCookies.removeItem("token");
          navigate('/');
        }
      });
    }

  }


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
              <li className="breadcrumb-item"><Link to={"/admin/dashboard"} style={{textDecoration: 'none'}}>Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Students</li>
            </ol>
          </nav>
          <div className="addStudent-btn">
            <Link to={'/admin/students/add'} className="add-stu"><button className='btn btn-success btn-md'>Add Student</button></Link>
          </div>
          <div className="container mt-5">
            <small>Total Students : {studentData.length}</small>
            <small style={{marginLeft : '20px'}}>Selected : {selectall ? studentData.length : checked.length }</small>
            {checked.length > 0 || selectall ? (
              <button className='btn btn-sm btn-outline-danger' onClick={deleteSelected} title='remove selected' style={{marginLeft : '20px'}}><Trash3Fill/></button>
            ):(
              ""
            )}

          </div>          
          <table className="table table-sm table-hover container mt-2">
            <thead>
              <tr>
                <th scope="col" className='text-center'><input type="checkbox" onChange={selectAll} className='form-check-input' id='check-all'/></th>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope='col'>Last Name</th>
                <th scope="col">Email</th>
                <th className='text-center' scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentData.length > 0 ? studentData.map((row, index) =>(
              <tr key={row._id}>
                <th scope="row" className='text-center'><input type="checkbox" checked={checked.find(id=>id === row._id) || (selectall) ? true : false} value={row._id} onChange={checkSubject}  className='form-check-input check-one'/></th>
                <th>{index + 1}</th>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.email}</td>
                <td className='text-center'>
                  <button title='remove' className="btn btn-outline-danger btn-sm" onClick={()=>{deleteStudent(row._id)}}><Trash3Fill/></button>
                  <button title='edit' style={{marginLeft: '10px'}} onClick={()=>{editStudent(row._id)}} className="btn btn-outline-primary btn-sm"><PencilSquare/></button>
                  <button title='view' style={{marginLeft: '10px'}} onClick={()=>{viewStudent(row._id)}} className="btn btn-sm btn-outline-info"><Folder2Open/></button>
                </td>
              </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center">No Students Found</td>
                </tr>
              )}
            </tbody>
          </table>
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

export default AdminStudents