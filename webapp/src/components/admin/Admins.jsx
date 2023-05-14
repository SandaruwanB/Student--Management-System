import React, { useEffect, useState } from 'react'
import {Backdrop, CircularProgress} from '@mui/material'
import {Trash3Fill, PencilSquare} from 'react-bootstrap-icons'
import Navbar from '../layouts/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import jsCookies from 'js-cookies'
import { decodeToken } from 'react-jwt'
import {ToastContainer, toast} from 'react-toastify'

const Admins = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState([]);
  const [status, setStatus] = useState(true);
  const [user, setUser] = useState("");
  const [checked, setChecked] = useState([]);
  const [selectall, setSelectAll] = useState(false);


  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

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

  axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
  axios.get('http://localhost:8080/admins').then(res=>{
    if(res.data.result === "success"){
      setAdminData(res.data.data);
    }
    else{
      setStatus(false);
    }
  });

  useEffect(()=>{
    const delToken = jsCookies.getItem('del');
    const decodetoken = decodeToken(jsCookies.getItem('token'));

    if(delToken){
      showSuccess("User Account Succesfully Removed");
      jsCookies.removeItem('del');
    }

    const userSet = ()=>{
      setUser(decodetoken.user)
    }
    userSet();

    setTimeout(()=>{
      setIsLoading(false);
    },600);
    
  },[setStatus]);


  const deleteAdmin = (id)=>{
    navigate('/admin/admins/delete/' + id);
  }

  const editAdmin = (id)=>{
    navigate('/admin/admins/edit/' + id);
  }

  const checkSubject = (e)=>{
    const userid = e.target.value;
    const checkVal = checked.find(id=>id === userid);
    if(checkVal){
      const temp = [...checked];
      temp.splice(userid,1);
      setChecked(temp);
    }
    else{
      setChecked(oldArray=>[
        ...oldArray,
        userid
      ]);
    }
  }

  const checkAllUsers = ()=>{
    setSelectAll(!selectall);
    setChecked([]);
  }


  const deleteAdminChecked = ()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    if(selectall){
      axios.post("http://localhost:8080/admins/delete/selected",{
        data : "all"
      }).then(res=>{
        if(res.data.result === 'success'){
          showSuccess("Successfully Removed");
          setChecked([]);
          setSelectAll(false);
        }
        else{
          jsCookies.removeItem('token');
          navigate('/');
        }
      });
    }
    else{
      axios.post("http://localhost:8080/admins/delete/selected",{
        data : checked
      }).then(res=>{
        if(res.data.result === 'success'){
          showSuccess("Successfully Removed");
          setChecked([]);
          setSelectAll(false);
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
              <li className="breadcrumb-item active" aria-current="page">Admins</li>
            </ol>
          </nav>
          <div className="addStudent-btn">
            <Link to={'/admin/admins/add'} className="add-stu"><button className='btn btn-success btn-md'>Add Admin</button></Link>
          </div>
          <div className="container mt-5">
            <small>Total Admins : {adminData.length === 1 ? 0 : adminData.length - 1 }</small>
            <small style={{marginLeft : '20px'}}>Selected : {selectall ? adminData.length - 1 : checked.length}</small>
            {selectall || checked.length > 0 ? (
              <button className="btn btn-sm btn-outline-danger" onClick={deleteAdminChecked} style={{marginLeft : '20px'}}><Trash3Fill/></button>
            ): ("")}

          </div>
          <table className='table table-sm table-hover container mt-2'>
            <thead>
              <tr>
                <th className='text-center' scope='col'><input type="checkbox" checked={selectall ? true : false} onChange={checkAllUsers} className='form-check-input'/></th>
                <th scope='col'>#</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Email</th>
                <th scope='col' className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.length > 0 ? adminData.map((row,index)=>(
                row.email === user && adminData.length === 1 ?  <tr key={1}><td className='text-center' colSpan={6}>No Admins Found</td></tr> : 
                row.email === user ? "" :  
                <tr key={row._id}>
                  <td className='text-center'><input type="checkbox" value={row._id} checked={selectall || checked.find(id=>id === row._id) ? true : false} onChange={checkSubject} className='form-check-input'/></td>
                  <td>{index}</td>
                  <td>{row.firstname}</td>
                  <td>{row.lastname}</td>
                  <td>{row.email}</td>
                  <td className='text-center'>
                    <button className='btn btn-sm btn-outline-danger' onClick={()=>deleteAdmin(row._id)} title='remove'><Trash3Fill/></button>
                    <button className='btn btn-sm btn-outline-primary' onClick={()=>editAdmin(row._id)} title='edit' style={{marginLeft : '10px'}}><PencilSquare/></button>
                  </td>
        
                </tr>
              )) : (
                <tr key={1}>
                  <td className='text-center' colSpan={6}>No Admins Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
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

export default Admins