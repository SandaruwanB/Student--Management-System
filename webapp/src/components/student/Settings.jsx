import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ArrowBarLeft } from 'react-bootstrap-icons'
import axios from 'axios'
import jsCookies from 'js-cookies'

const StudentSettings = () => {
  const navigate = useNavigate();
  const [passortext, setPassOrText] = useState(true);
  const [newpass, setNewPass] = useState("");
  const [repass, setRePass] = useState("");
  const [oldpass, setOldPassword] = useState("");

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

  const goBack = ()=>{
    navigate(-1);
  }

  const changeSettings = ()=>{
    if(oldpass === "" || newpass === "" || repass === ""){
      showAlert("All Fields are Required.");
    }
    else if(newpass !== repass){
      showAlert("Passwords doesn't Matched.");
    }
    else{
      axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
      axios.post('http://localhost:8080/changepass',{
        oldpass : oldpass,
        newpass : newpass
      }).then(res=>{
        if(res.data.result === 'pass'){
            showAlert("Incorrect Old Password.");
        }
        else if(res.data.result === 'success'){
            showSuccess("Successfully Changed.");
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
        <div className="mt-5 text-center">
          <h1>Account Settings</h1>
        </div>
        <div className="container mt-5">
        <button className="btn btn-md btn-info text-light" onClick={goBack}><ArrowBarLeft style={{fontSize : '1.5rem'}}/>&nbsp;Go Back</button>
        </div>
        <div className="container mt-5">
          <span>Change Password</span>
          <hr />
        </div>
        <div className="row mt-4">
            <div className="mx-auto col-sm-12 col-md-8 col-lg-6">
                <div className="container mx-auto">
                    <div className="row mt-5">
                        <div className="col mt-3">
                            <input type={passortext ? "password" : "text"} onChange={(e)=>setOldPassword(e.target.value)} placeholder='old password' className='form-control'/>
                            <span style={{marginLeft : '10px', marginTop : '10px'}}>Old Password</span>
                        </div>
                        <div className="col mt-3">
                            <input type={passortext ? "password" : "text"} onChange={(e)=>setNewPass(e.target.value)} className='form-control' placeholder="new password"/>
                            <span style={{marginLeft : '10px', marginTop : '10px'}}>New Password</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <input type={passortext ? "password" : "text"} onChange={(e)=>setRePass(e.target.value)} placeholder='confirm password'  className='form-control'/>
                            <span style={{marginLeft : '10px', marginTop : '10px'}}>Confirm Password</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                        <input type="checkbox" onChange={(e)=>setPassOrText(!passortext)} className='form-check-input'  style={{marginLeft : '10%'}}/>&nbsp; Show Passwords
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-4">
                        <button className='btn btn-sm btn-success' onClick={changeSettings}>Change Password</button>
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

export default StudentSettings