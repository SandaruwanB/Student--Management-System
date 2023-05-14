import React, { useEffect, useState } from 'react'
import TeacherNav from '../layouts/teacherNav'
import axios from 'axios';
import jsCookies from 'js-cookies'
import { useNavigate } from 'react-router-dom';

const ShowStudents = () => {
    const navigate = useNavigate();
    const [students,setStudents] = useState([]);
    const [status,setStatus] = useState(true);

    if(status === false){
        jsCookies.removeItem('token');
        navigate('/');
    }

    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
        axios.get("http://localhost:8080/students").then(res=>{
            if(res.data.result === 'success'){
                setStudents(res.data.data);
            }
            else{
                setStatus(false)
            }
        })
    },[setStatus,setStudents]);


    const showStudentData = (id)=>{
        navigate('/teacher/students/show/' + id);
    }
    
    return (
    <div>
        <TeacherNav/>
        <div className="container mt-5">
            <div className="text-center">
                <h1>Students</h1>
                <span>Hear you can view all the student data in our database.</span>
            </div>
            <table className='table table-sm table-hover mt-5 text-center'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? students.map((row,index)=>{
                        return <tr key={index} onClick={()=>showStudentData(row._id)} style={{cursor : 'pointer'}}>
                            <th>{index + 1}</th>
                            <td>{row.firstname}</td>
                            <td>{row.lastname}</td>
                            <td>{row.email}</td>
                            <td><button className='btn btn-sm btn-outline-info' onClick={()=>showStudentData(row._id)}>View</button></td>
                        </tr>
                    }): (
                        <tr>
                            <td colSpan={5}>
                                Students Not Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowStudents