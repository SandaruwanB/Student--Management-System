import React, { useEffect, useState } from 'react'
import StudentNav from '../layouts/studentNav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jsCookies from 'js-cookies'

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [status, setStatus] = useState(true);

  if(status === false){
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/student").then(res=>{
      if(res.data.result === "success"){
        setCertificates(res.data.student.certificates);
      }
      else{
        setStatus(false);
      }
    })
  })

  const viewFile = (file)=>{
    window.open('/uploads/' + file, '_blank');
  }

  return (
    <div>
      <StudentNav/>
      <div className="container">
        <div className="text-center mt-5">
          <h1>Your Certificates</h1>
          <span>Your achievement apears here. if you want you can download that all.</span>
        </div>
        <div className="mt-5">
          {certificates.length === 0 ? (
            <div className="alert alert-info text-center">No Certificates Found</div>
          ): (
            <div className="row gx-3 mt-3 mx-auto">
              {certificates.map((value,index)=>{
                return <div className="col-sm-12 col-md-4 col-lg-3 text-center p-3" key={index} style={{border : '1px solid #000', borderRadius : '10px', boxShadow : '0 2px 4px 2px rgba(0,0,0,0.4)', marginRight : '10px'}}>
                  <embed src={'/uploads/'+value} width={130} height={130} style={{display : 'block', marginLeft : '28%'}}/>
                  <div className="text-center mt-3">
                    <button className='btn btn-sm btn-outline-success' onClick={(e)=>viewFile(value)}>Open</button>
                  </div>
                </div>
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Certificates