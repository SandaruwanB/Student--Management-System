import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import jsCookies from 'js-cookies'

function AdminSettings() {
  const navigate = useNavigate();
  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [repass, setRePass] = useState("");
  const [passortext, setPassorText] = useState(true);

  const goBack = ()=>{
    navigate(-1);
  }

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

  const changePassword = ()=>{
    if(oldpass === "" || newpass === "" || repass === ""){
      showAlert("All Fields are Required")
    }
    else if(repass !== newpass){
      showAlert("Your Confirm Password is Diffrent");
    }
    else{
      axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem("token");
      axios.post("http://localhost:8080/changepass", {
        oldpass : oldpass,
        newpass : newpass,
      }).then(res=>{
        if(res.data.result === "success"){
          showSuccess("Succefully Updated");
        }
        else if(res.data.result === "pass"){
          showAlert("Invalid Old Password.")
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
      <div className="container">
        <h2 className='text-center mt-5'>Account Settings</h2>
        <button className='mt-5 btn btn-md btn-info text-light' onClick={goBack}>Go Back</button>
        <div className="mt-4">
          <small>Account Password</small>
          <hr/>
        </div>
        <div className="row mt-4">
          <div className="mx-auto col-sm-12 col-md-8 col-lg-6">
            <div className="container mx-auto">
              <div className="row mt-5">
                <div className="col mt-3">
                  <input type={passortext ? "password" : "text"} onChange={(e)=>setOldPass(e.target.value)} placeholder='old password' className='form-control'/>
                  <span style={{marginLeft : '10px', marginTop : '10px'}}>Old Password</span>
                </div>
                <div className="col mt-3">
                  <input type={passortext ? "password" : "text"} className='form-control' onChange={(e)=>setNewPass(e.target.value)} placeholder="new password"/>
                  <span style={{marginLeft : '10px', marginTop : '10px'}}>New Password</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input type={passortext ? "password" : "text"} placeholder='confirm password' onChange={(e)=>setRePass(e.target.value)} className='form-control'/>
                  <span style={{marginLeft : '10px', marginTop : '10px'}}>Confirm Password</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <input type="checkbox" className='form-check-input' onClick={()=>setPassorText(!passortext)} style={{marginLeft : '10%'}}/>&nbsp; Show Passwords
                </div>
              </div>
              <div className="row">
                <div className="col mt-4">
                  <button className='btn btn-sm btn-success' onClick={changePassword}>Change Password</button>
                </div>
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

export default AdminSettings