import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaretDownFill, CaretUpFill, GearWideConnected,BoxArrowInDownLeft, List,XCircleFill } from 'react-bootstrap-icons'
import jsCookies from 'js-cookies'
import { useState } from 'react'
import {decodeToken} from 'react-jwt'

const StudentNav = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const showSettings = ()=>{
    document.querySelector('.user-settings1').classList.add('d-none');
    document.querySelector('.user-settings2').classList.remove('d-none');
    document.getElementById('dropdownTeacher').classList.remove('d-none');
  }

  useEffect(()=>{
    const token = jsCookies.getItem('token');
    const tokenDecode = decodeToken(token);
    setFirstName(tokenDecode.firstname);
    setLastName(tokenDecode.lastname);
  },[setFirstName,setLastName])

  const hideSettings = ()=>{
    document.querySelector('.user-settings2').classList.add('d-none');
    document.querySelector('.user-settings1').classList.remove('d-none');
    document.getElementById('dropdownTeacher').classList.add('d-none');
  }

  const signOut = ()=>{
    jsCookies.removeItem('token');
    navigate('/');
  }

  const showTopnav = ()=>{
    document.getElementById('topnavitems').classList.remove('d-none');
  }
  const hideTopnav = ()=>{
    document.getElementById('topnavitems').classList.add('d-none');
  }

  return (
    <div>
      <nav className="navbar navbar-dark navbar-lg" style={{background : 'rgb(17, 20, 54)'}}>
        <div className="container">
          <div>
            <Link to={'/student/home'} className='navbar-brand' style={{fontSize : '2rem'}}>SMS</Link>
          </div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link to={'/student/home'} className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/student/details"} className="nav-link text-light">My Details</Link>
            </li>
            <li className="nav-item">
              <Link to={"/student/certifaces"} className="nav-link text-light">Certifications</Link>
            </li>
            <li className="nav-item">
              <Link to={"/student/result"} className="nav-link text-light">Results</Link>
            </li>
          </ul>
          <div>
            <div>
              <List style={{color : '#fff', fontSize : '2rem', cursor : 'pointer'}} onClick={showTopnav} id='burger-btn'/>
            </div>
            <div className="user-settings1" style={{cursor : 'pointer'}} onClick={showSettings}>
              <img src={'../images/tempUser.png'} className='p-3' alt='img' style={{width : '70px', borderRadius : '50%'}}/>
              <CaretDownFill style={{color : '#fff'}}/>
            </div>
            <div className="user-settings2 d-none" style={{cursor : 'pointer'}} onClick={hideSettings}>
              <img src={'../images/tempUser.png'} className='p-3' alt='img' style={{width : '70px', borderRadius : '50%'}}/>
              <CaretUpFill style={{color : '#fff'}}/>
            </div>
          </div>
        </div>
        <div className='d-none' id='dropdownTeacher'>
          <div className="text-center">
            <h6>{firstName + " " + lastname}</h6>
          </div>
          <hr />
          <div  className="hide-link text-center">
            <Link to={'/student/settings'} style={{textDecoration: 'none', color: 'rgb(17, 20, 54)',  fontSize: '1.2rem'}}><GearWideConnected/> <small>Settings</small> </Link>
          </div>
          <div className='hide-link text-center' style={{color: 'rgb(17, 20, 54,)', fontSize: '1.2rem', cursor: 'pointer'}} onClick={signOut}>
            <BoxArrowInDownLeft/> <small>Sign Out</small>
          </div>
        </div>
      </nav>

      <div className="topnav-liks d-none" id='topnavitems'>
        <div className="close-btn"><XCircleFill style={{fontSize : '2rem', cursor : 'pointer'}} onClick={hideTopnav}/></div>
        <div className="content">
          <ul>
            <li><Link to={'/student/home'} style={{textDecoration : 'none', color : '#fff'}}>Home</Link></li>
            <li><Link to={'/student/details'} style={{textDecoration : 'none', color : '#fff'}}>My Details</Link></li>
            <li><Link to={'/student/certifaces'} style={{textDecoration : 'none', color : '#fff'}}>Certifications</Link></li>
            <li><Link to={'/student/result'} style={{textDecoration : 'none', color : '#fff'}}>Results</Link></li>
            <li><Link to={'/student/settings'} style={{textDecoration : 'none', color : '#fff'}}>Settings</Link></li>
            <li><span style={{cursor : 'pointer'}} onClick={signOut}>Log Out</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudentNav