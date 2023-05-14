import jsCookies from 'js-cookies';
import { decodeToken } from 'react-jwt'
import { Outlet,Navigate } from 'react-router-dom';

const authCheck = ()=>{
    var auth = null;
    const token = jsCookies.getItem('token');
    const decodedToken = decodeToken(token);
    if(token){
        if(decodedToken.role === "teacher"){
            auth = "teacher";
        }
        else if(decodedToken.role === "admin"){
            auth = "admin";
        }
        else{
            auth = "student"
        }
    }
    else{
        auth = null;
    }
    return auth;
}

const AuthCheck = () => {
    const auth = authCheck();

    return (
        auth === "admin" ? <Navigate to={"/admin/dashboard"}/> : auth === "teacher" ? <Navigate to={"/teacher/home"}/> : auth === "student" ? <Navigate to={"/student/home"}/> : <Outlet/>
    )
}

export default AuthCheck