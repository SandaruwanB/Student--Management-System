import React, { useEffect, useState } from 'react'
import StudentNav from '../layouts/studentNav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsCookies from 'js-cookies'

const StudentResults = () => {
  const navigate = useNavigate();
  const [results,setResults] = useState([]);
  const [status, setStatus] = useState(true);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/student").then(res=>{
      if(res.data.result === "success"){
        setResults(res.data.student.subjectsandmarks);
      }
      else{
        setStatus(false);
      }
    });
  },[setResults,setStatus])

  return (
    <div>
      <StudentNav/>
      <div className="container mt-5">
        <div className="text-center">
          <h1>Results Details</h1>
          <span>If you have a problem with your marks please contact adminand your subject teacher.</span>
        </div>
        <div className="mt-5">
          {results.length > 0 ? (
            <table className='table mt-5 text-center'>
              <thead>
                <tr>
                  <th scope='col'>Grade</th>
                  <th scope='col'>Subject</th>
                  <th scope='col'>Marks</th>
                  <th scope='col'>Obtained Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.map((value,index)=>{
                  return <tr key={index}>
                    <td>Grade {value.grade}</td>
                    <td>{value.subjectname}</td>
                    <td>{value.mark}</td>
                    <td>{value.mark >= 90 ? "A+" : value.mark >= 75 ? "A" : value.mark >= 65 ? "B" : value.mark >= 55 ? "C" : value.mark >= 35 ? "S" : "F"}</td>
                  </tr>
                })}
              </tbody>
            </table>
          ):(
            <div className="alert alert-info text-center">No Results to Show</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentResults