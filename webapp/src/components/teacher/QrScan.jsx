import React, { useEffect } from 'react'
import TeacherNav from '../layouts/teacherNav'
import QrReader from 'react-qr-scanner'
import { useNavigate } from 'react-router-dom'
import jsCookies from 'js-cookies'
import { ToastContainer, toast } from 'react-toastify'

const QrScan = () => {
  const navigate = useNavigate();

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

  const qrScanned = (data)=>{
    if(data){
      navigate("/teacher/scan/" + data?.text);
    }
  }

  useEffect(()=>{
    const errorToken = jsCookies.getItem('user');
    if(errorToken){
      showAlert("Scanned QR Code is Invalid.");
      jsCookies.removeItem('user');
    }
  })

  return (
    <div>
      <TeacherNav/>
      <div className="mt-5">
        <div className="text-center">
          <h1>Scan QR Code</h1>
          <span>After scanning QR Code you can view student data related to that Student.</span>
        </div>
        <div className="container text-center">
          <QrReader
            style = {{width : 360, height : 600}}
            delay = {1000}
            onError={(err)=>console.log(err)}
            onScan={qrScanned}
          />
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

export default QrScan