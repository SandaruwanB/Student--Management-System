import jsCookies from 'js-cookies';
import { decodeToken } from 'react-jwt'
import { Outlet,Navigate } from 'react-router-dom';

const authCheck = ()=>{
    var auth = false;
    const token = jsCookies.getItem('token');
    const decodedToken = decodeToken(token);
    if(token){
        if(decodedToken.role === "admin"){
            auth = true;
        }
        else{
            auth = false;
        }
    }
    else{
        auth = false;
    }
    return auth;
}

export const AdminRoutesProtection = () => {
    const auth = authCheck();

    return (
        auth ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default AdminRoutesProtection;