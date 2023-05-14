import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Backdrop, CircularProgress} from '@mui/material'
import jsCookies from 'js-cookies';

const StudentDelete = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        deleteUser();
    });

    const deleteUser = ()=>{
        axios.delete('http://localhost:8080/student/delete/' + id).then((res=>{
            jsCookies.setItem("del", true);
            navigate('/admin/students');
        }));
    }


    return (

        <div>        
            <Backdrop sx={{color: '#fff',background : "rgb(17, 20, 54)", zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
                <CircularProgress color='inherit'/>
            </Backdrop>
        </div>
    )
}

export default StudentDelete