import axios from 'axios';
import jsCookies from 'js-cookies';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

const Qrcheck = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
        axios.get('http://localhost:8080/qrcheck/' + id).then(res=>{
            if(res.data.result === "notfound"){
                jsCookies.setItem("user", res.data.result);
                navigate('/admin/scan');
            }
            else{
                navigate('/admin/students/view/' + id);
            }
        })
    })

  return (
    <div>
        <Backdrop sx={{color: '#fff',background : "rgb(17, 20, 54)", zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
            <CircularProgress color='inherit'/>
        </Backdrop>
    </div>
  )
}

export default Qrcheck