import React, { useEffect, useState } from 'react'
import {Backdrop, CircularProgress} from '@mui/material'
import Navbar from '../layouts/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import QrReader from 'react-qr-scanner'
import jsCookies from 'js-cookies'
import {toast, ToastContainer} from 'react-toastify'
import QRScanner from 'qr-scanner'


const ScanQR = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState();

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

    useEffect(()=>{
        const notfound = jsCookies.getItem('user')
        if(notfound){
            showAlert("Invalid QR Code Scanned");
            jsCookies.removeItem('user');
        }
        setTimeout(()=>{
            setIsLoading(false);
        },700);
    });

    const qrScanned = (data)=>{
        if(data){
            navigate('/admin/student/check/' + data?.text);
        }
    }

    const findStudentByQR = async ()=>{
        const result = await QRScanner.scanImage(image);
        navigate('/admin/student/check/' + result);
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
                        <li className="breadcrumb-item active" aria-current="page">Scan QR</li>
                    </ol>
                </nav>
                <div className="container" style={{marginTop : '80px'}}>
                    <h4 className='text-center'>Scan Student QR Code to View Data</h4>
                    <p className='text-center'>If you have student's qr code it's easy to find student data.please scan to view student data.</p>
                    <div className="text-center">
                        <div className="mt-5">
                            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                            <button className='btn btn-md btn-primary' style={{marginLeft : '40px'}} onClick={findStudentByQR}>Scan Uploaded QR Image</button>
                        </div>
                        <hr/>
                        <div className='text-center'>Or Scan Using Camera</div>
                        <QrReader
                            style = {{width : 400, height : 600}}
                            delay = {1000}
                            onError = {(err)=>console.log(err)}
                            onScan = {qrScanned}
                        />
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

export default ScanQR