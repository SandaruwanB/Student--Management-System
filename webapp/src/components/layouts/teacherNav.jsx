import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaretDownFill, CaretUpFill, GearWideConnected,BoxArrowInDownLeft,XCircleFill,List } from 'react-bootstrap-icons'
import jsCookies from 'js-cookies'
import { useState } from 'react'
import {decodeToken} from 'react-jwt'

const TeacherNav = () => {
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

  const hideTopnav = ()=>{
    document.getElementById('topnavitems').classList.add('d-none');
  }

  const showTopnav = ()=>{
    document.getElementById('topnavitems').classList.remove('d-none');
  }

  return (
    <div>
      <nav className="navbar navbar-dark navbar-lg" style={{background : 'rgb(17, 20, 54)'}}>
        <div className="container">
          <div>
            <Link to={'/teacher/home'} className='navbar-brand' style={{fontSize : '2rem'}}>SMS</Link>
          </div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link to={'/teacher/home'} className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/teacher/students'} className="nav-link text-light">Students</Link>
            </li>
            <li className="nav-item">
              <Link to={'/teacher/scan'} className="nav-link text-light">Scan QR</Link>
            </li>
            <li className="nav-item">
              <Link to={'/teacher/details'} className="nav-link text-light">My Details</Link>
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
            <Link to={'/teacher/settings'} style={{textDecoration: 'none', color: 'rgb(17, 20, 54)',  fontSize: '1.2rem'}}><GearWideConnected/> <small>Settings</small> </Link>
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
            <li><Link to={'/teacher/home'} style={{textDecoration : 'none', color : '#fff'}}>Home</Link></li>
            <li><Link to={'/teacher/students'} style={{textDecoration : 'none', color : '#fff'}}>Students</Link></li>
            <li><Link to={'/teacher/scan'} style={{textDecoration : 'none', color : '#fff'}}>Scan QR</Link></li>
            <li><Link to={'/teacher/details'} style={{textDecoration : 'none', color : '#fff'}}>My Details</Link></li>
            <li><Link to={'/teacher/settings'} style={{textDecoration : 'none', color : '#fff'}}>Settings</Link></li>
            <li><span style={{cursor : 'pointer'}} onClick={signOut}>Log Out</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TeacherNav