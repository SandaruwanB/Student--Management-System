import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import jsCookies from 'js-cookies'
import axios from 'axios'

const CheckQrStudent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const isLoading = true;

    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
        axios.get('http://localhost:8080/qrcheck/' + id).then(res=>{
            if(res.data.result === "notfound"){
                jsCookies.setItem("user", res.data.result);
                navigate('/teacher/scan');
            }
            else{
                navigate('/teacher/students/show/' + id);
            }
        })
    })
    
    return (
        <div>
        {isLoading ? (
            <Backdrop sx={{color: '#fff', zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
                <CircularProgress color='inherit'/>
            </Backdrop>
        ): ("")}
        </div>
    )
}

export default CheckQrStudent