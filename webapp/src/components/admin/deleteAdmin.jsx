import React from 'react'
import {Backdrop, CircularProgress} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import jsCookies from 'js-cookies';
import { useEffect } from 'react';

const DeleteAdmin = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        deleteAdmin();
    })

    const deleteAdmin = ()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + jsCookies.getItem('token');
        axios.delete('http://localhost:8080/admin/delete/' + id).then(res=>{
            if(res.data.result === "success"){
                jsCookies.setItem("del", true);
                navigate('/admin/admins');
            }
            else{
                jsCookies.removeItem('token');
                navigate('/');
            }
        })
    }


    return (
    <div>
        <Backdrop sx={{color: '#fff',background : "rgb(17, 20, 54)", zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
            <CircularProgress color='inherit'/>
        </Backdrop>
    </div>
  )
}

export default DeleteAdmin