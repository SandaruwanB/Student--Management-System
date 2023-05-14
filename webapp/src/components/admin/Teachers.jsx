import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import {Trash3Fill, Folder2Open, PencilSquare} from 'react-bootstrap-icons'
import {Backdrop, CircularProgress} from '@mui/material'
import axios from 'axios'
import jsCookies from 'js-cookies'
import {ToastContainer, toast} from 'react-toastify'

const AdminTeachers = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [teachersData, setTeachersData] = useState([]);
    const [status, setStatus] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [checked, setChecked] = useState([]);

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

    const deleteTeacher = (id)=>{
        navigate('/admin/teachers/delete/' + id);
    }

    const viewTeacher = (id)=>{
        navigate('/admin/teachers/view/' + id);
    }

    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/teachers").then(res=>{
        if(res.data.result === "success"){
            setTeachersData(res.data.data); 
        }
        else{
            setStatus(false);
        }
    });

    useEffect(()=>{
        const delToken = jsCookies.getItem('del');

        if(delToken){
            jsCookies.removeItem('del');
            showSuccess("Teacher Details Successfully Removed");
        }

        setTimeout(()=>{
            setIsLoading(false);
        },700);
    }, [setTeachersData, setStatus]);

    const editTeacher = (id)=>{
        navigate('/admin/teachers/edit/' + id);
    }

    const selectAllInputs = ()=>{
        setSelectAll(!selectAll);
        setChecked([]);
    }

    const addCheckInput = (e)=>{
        const id = e.target.value;
        const checkVal = checked.find(userid => userid === id);
        if(checkVal){
            const temp = [...checked];
            temp.splice(id, 1);
            setChecked(temp);
        }
        else{
            setChecked(oldArray=>[
                ...oldArray,
                id
            ]);
        }
    }

    const deleteSelected = ()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem("token");
        if(selectAll){
            axios.post("http://localhost:8080/teachers/delete/selected", {
                data : "all"
            }).then(res=>{
                if(res.data.result === "success"){
                    showSuccess("Successfully Removed");
                }
                else{
                    jsCookies.removeItem('token');
                    navigate('/');
                }
            })
        }
        else{
            axios.post("http://localhost:8080/teachers/delete/selected", {
                data : checked
            }).then(res=>{
                if(res.data.result === "success"){
                    showSuccess("Successfully Removed");
                }
                else{
                    jsCookies.removeItem('token');
                    navigate('/');
                }
            })
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
                        <li className="breadcrumb-item active" aria-current="page">Teachers</li>
                    </ol>
                </nav>
                <div className="addStudent-btn">
                    <Link to={'/admin/teachers/add'} className="add-stu"><button className='btn btn-success btn-md'>Add Teacher</button></Link>
                </div>
                <div className="container mt-5">
                    <small>Total Students : {teachersData.length}</small>
                    <small style={{marginLeft : '20px'}}>Selected : {selectAll ? teachersData.length : checked.length}</small>
                    {selectAll || checked.length > 0 ? (
                        <button className="btn btn-sm btn-outline-danger" onClick={deleteSelected} title='remove selected data' style={{marginLeft : '20px'}}><Trash3Fill/></button>
                    ): ("")}

                </div>
                <table className='table table-sm table-hover container mt-2'>
                    <thead>
                        <tr>
                            <th scope='col' className='text-center'><input type="checkbox" onChange={selectAllInputs} className='form-check-input' /></th>
                            <th scope='col'>#</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col' className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachersData.length > 0 ? teachersData.map((row,index)=>(
                            <tr key={row._id}>
                                <th scope='row' className='text-center'><input type="checkbox" value={row._id} onChange={addCheckInput} checked={checked.find(id=>id === row._id) || selectAll ? true : false} className='form-check-input'/></th>
                                <td>{index + 1}</td>
                                <td>{row.firstname}</td>
                                <td>{row.lastname}</td>
                                <td>{row.email}</td>
                                <td className='text-center'>
                                    <button className='btn btn-sm btn-outline-danger' onClick={()=>deleteTeacher(row._id)}><Trash3Fill/></button>
                                    <button className='btn btn-sm btn-outline-primary' onClick={()=>editTeacher(row._id)} style={{marginLeft : '10px'}}><PencilSquare/></button>
                                    <button className='btn btn-sm btn-outline-info' onClick={()=>viewTeacher(row._id)} style={{marginLeft : '10px'}}><Folder2Open/></button>
                                </td>
                            </tr>
                            )): (
                            <tr>
                                <td colSpan={6} className='text-center'>No Teachers Found</td>
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

export default AdminTeachers