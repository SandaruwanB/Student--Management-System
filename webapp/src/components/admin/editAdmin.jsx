import axios from 'axios'
import jsCookies from 'js-cookies'
import React, { useEffect, useState } from 'react'
import {EyeFill, EyeSlashFill, ArrowBarLeft} from  'react-bootstrap-icons'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'

const EditAdmin = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);

  const showAlert = (text) => toast.error(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

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

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    axios.get("http://localhost:8080/admin/update/" + id).then(res=>{
      if(res.data.result === "success"){
        setEmail(res.data.data.email);
        setFirstName(res.data.data.firstname);
        setLastName(res.data.data.lastname);
      }
      else{
        setStatus(false);
      }
    })
  },[setEmail,setFirstName,setLastName]);

  const updateAdmin = ()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
    if(firstname === "" || lastname === "" || email === "" || password === ""){
      showAlert("All Fields are Required.");
    }
    else{
      axios.post("http://localhost:8080/admin/update", {
        id : id,
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password
      }).then(res=>{
        if(res.data.result === "success"){
          showSuccess("Successfully Updated.");
        }
        else{
          jsCookies.removeItem('token');
          navigate('/');
        }
      });
    }
  }

  const showPass = ()=>{
    document.getElementById('passField').type = "text";
    document.getElementById('showPass').classList.add('d-none');
    document.getElementById('hidePass').classList.remove('d-none');
  }
  const hidePass = ()=>{
    document.getElementById('passField').type = "password";
    document.getElementById('showPass').classList.remove('d-none');
    document.getElementById('hidePass').classList.add('d-none');
  }

  return (
    <div>
        <div className="text-center mt-5">
          <h3 style={{color : 'rgb(17, 20, 54)'}}>Admin Account Detils</h3>
        </div>
        <div className='container'>
            <div className='mb-4' style={{marginTop: '70px'}}>
                <Link to={'/admin/admins'}><button className='btn btn-md btn-info text-light'><ArrowBarLeft style={{fontSize: '1.6rem'}}/> Go Back</button></Link>
            </div>
            <h6>Account Details</h6>
            <hr />
            <div className="row mt-3 mb-5">
                <div className="mx-auto col-12 col-md-10 col-lg-8">
                    <div className="container mx-auto mt-4">
                        <div className="row">
                            <div className="col">
                                <input type="text" value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} className='form-control' placeholder='first name'/>
                                <span style={{marginLeft: '10px'}}>First Name</span>
                            </div>
                            <div className="col">
                                <input type="text" value={lastname} onChange={(e)=>{setLastName(e.target.value)}} className='form-control' placeholder='last name' />
                                <span style={{marginLeft : '10px'}}>Last Name</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='form-control' placeholder='email'/>
                                <span style={{marginLeft : '10px'}}>Email</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col" style={{position : 'relative'}}>
                                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="passField" className='form-control' placeholder='password'/>
                                <div className='icon' style={{position: 'absolute', top: '12%', right : '30px', cursor : 'pointer'}}>
                                    <EyeFill onClick={showPass} id='showPass'/>
                                    <EyeSlashFill className='d-none' onClick={hidePass} id='hidePass'/>
                                </div>
                                <span style={{marginLeft : '10px'}}>Password</span>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button className='btn btn-md btn-primary' onClick={updateAdmin}>Update Admin Details</button>
                        </div>
                    </div>
                </div>
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

export default EditAdmin