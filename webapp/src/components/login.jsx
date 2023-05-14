import React, { useEffect, useState } from 'react'
import {PersonFill, EyeFill, EyeSlashFill, UnlockFill, EnvelopeFill} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router';
import jsCookies from 'js-cookies';
import axios from 'axios';
import {Backdrop, CircularProgress} from '@mui/material'



const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        },3000);
    },[]);

    const loginSubmit = async (e)=>{
        e.preventDefault();
        const errorSetter = document.getElementById('error-setter');
    
        if(userName === "" || password === ""){      
            errorSetter.classList.remove('d-none');
            errorSetter.innerHTML = "All Fields are Required";
        }
        else{
            const res = await axios.post("http://localhost:8080/login",{
                username : userName,
                password : password
            });
            if(res.data.error === "user"){
                errorSetter.classList.remove('d-none');
                errorSetter.innerHTML = "Invalid Credetials.Account not Found.";
            }
            else if(res.data.error === "pass"){
                errorSetter.classList.remove('d-none');
                errorSetter.innerHTML = "Incorrect Password. Please try Again";
            }
            else{
                jsCookies.setItem("token", res.data.token);
                if(res.data.role === 'admin'){
                    navigate('/admin/dashboard');
                }
                else if(res.data.role === 'teacher'){
                    navigate('/teacher/home');
                }
                else{
                    navigate('/student/home');
                }
            }
        }
    }

    const showPassword = ()=>{
        document.getElementById('showPass').classList.add('d-none');
        document.getElementById('passField').type = 'text';
        document.getElementById('hidePass').classList.remove('d-none');
    }

    const hidePass = ()=>{
        document.getElementById('hidePass').classList.add('d-none');
        document.getElementById('passField').type = 'password';
        document.getElementById('showPass').classList.remove('d-none');
    }



    return (
        <div>
            {isLoading ? (
                <Backdrop sx={{color: '#fff', zIndex: (theme)=> theme.zIndex.drawer + 1}} open>
                    <CircularProgress color='inherit'/>
                </Backdrop>
            ): ("")}
            <div className="container-fluid login-content">
                <div className="login-form">
                    <div className="text-center text-light mb-5">
                        <h2 style={{fontWeight: 'bold'}}>Welcome</h2>
                        <h6>Student Management System</h6>
                    </div>
                    <div className="text-center mb-4">
                        <PersonFill color='#fff' size={60}/>
                        <div className="text-center text-light">
                            <h4>SIGN IN</h4>
                        </div>
                    </div>

                    <form autoComplete='off' onSubmit={loginSubmit}>
                        <div className="error-alert text-center p-2 mb-3 d-none" id='error-setter'></div>
                        <div className='input-fields'>
                            <input type="text" name='email'  className='d-block p-2 mb-4' onChange={(e)=>{setUserName(e.target.value)}} placeholder='Email'/>
                            <EnvelopeFill className='login-icon' size={20}/>
                        </div>
                        <div className="input-fields">
                            <input type="password" name='password' className='d-block p-2 mb-4' onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' id="passField"/>
                            <EyeFill className='login-icon' size={20} onClick={showPassword} id="showPass"/><EyeSlashFill size={20} className="login-icon d-none" onClick={hidePass} id='hidePass'/>
                        </div>
                        <div className="text-left mb-5">
                            <p style={{color: '#fff', marginLeft: '5%'}}>Forget Password &nbsp;<a href="/">Recover Password</a></p>
                        </div>
                        <div className="text-center">
                            <button type='submit'>SIGN IN<UnlockFill style={{marginLeft: '10px'}}/></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login