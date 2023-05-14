import React, { useState , useEffect } from 'react'
import { HouseFill, PersonFill, List, CaretDownFill,CaretUpFill, GearWideConnected,BoxArrowInDownLeft,QrCode } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import jsCookies from 'js-cookies'
import { decodeToken } from 'react-jwt'

const Navbar = () => {
  const [firstName , setFirstName] = useState('');
  const [image, setImage] = useState('');
  const [lastname, setLastName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const showSettingsBar = ()=>{
    document.getElementById('dropdown').classList.remove('d-none');
    document.getElementById('show-btn2').classList.add('d-none');
    document.getElementById('show-btn1').classList.remove('d-none');
  }
  const hideSettingsBar = ()=>{
    document.getElementById('dropdown').classList.add('d-none');
    document.getElementById('show-btn2').classList.remove('d-none');
    document.getElementById('show-btn1').classList.add('d-none');
  }
  const signOut = ()=>{
    jsCookies.removeItem('token');
    navigate('/');
  }

  useEffect(()=>{
    const token = jsCookies.getItem('token');
    const decodedToken = decodeToken(token);
    const setData =  ()=>{
      setFirstName(decodedToken.firstname);
      setLastName(decodedToken.lastname);
      setRole(decodedToken.role);
      setImage(decodedToken.image);
    };
    setData();

  },[]);

  const showSidebar = ()=>{
    document.querySelector('.sidebar').style.width = '0px';
    document.querySelector('.sidebar-menu').style.display = 'none';
    document.querySelector('.sidebar-brand').style.display = 'none';
    document.querySelector('.main-content').style.marginLeft = '0px';
    document.querySelector('.content').style.marginLeft = '0px';
    document.getElementById('show1').classList.add('d-none');
    document.getElementById('show2').classList.remove('d-none');
  }

  const hideSidebar = ()=>{
    document.querySelector('.sidebar').style.width = '300px';
    document.querySelector('.sidebar-menu').style.display = 'block';
    document.querySelector('.sidebar-brand').style.display = 'block';
    document.querySelector('.main-content').style.marginLeft = '300px';
    document.querySelector('.content').style.marginLeft = '300px';
    document.getElementById('show1').classList.remove('d-none');
    document.getElementById('show2').classList.add('d-none');
  }

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>SMS</h2>
        </div>
        <div className="sidebar-menu">
          {role === 'admin' ? (
          <ul>
            <li>
              <Link to={"/admin/dashboard"} style={{textDecoration: 'none'}}>
                <div className="a">
                  <span className='nav-icon'><HouseFill/></span>
                  <span className='nav-text'>Dashboard</span>
                </div>
              </Link>             
            </li>
            <li>
              <Link to={"/admin/students"} style={{textDecoration: 'none'}}>
                <div className="a" >
                  <span className='nav-icon'><PersonFill/></span>
                  <span className='nav-text'>Students</span>
                </div>
              </Link>   
            </li>
            <li>
              <Link to={"/admin/teachers"} style={{textDecoration: 'none'}}>
                <div className="a">
                  <span className='nav-icon'><PersonFill/></span>
                  <span className='nav-text'>Teachers</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/admin/admins"} style={{textDecoration: 'none'}}>
                <div className="a">
                  <span className='nav-icon'><PersonFill/></span>
                  <span className='nav-text'>Admins</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/admin/scan"} style={{textDecoration : 'none'}}>
                <div className="a">
                  <span className='nav-icon'><QrCode/></span>
                  <span className='nav-text'>Scan QR Code</span>
                </div>
              </Link>
            </li>
          </ul>
          ): ''}

          </div>
      </div>
      <div className="main-content">
        <header>
          <h1>
            <List id='show1' onClick={showSidebar}/>
            <List id='show2' className='d-none' onClick={hideSidebar}/>
          </h1>
          <div className="user-wrapper">
            <div className="show-btn1 d-none" style={{cursor: 'pointer'}} onClick={hideSettingsBar} id='show-btn1'>
              <img src={image === 'no' ? '../images/tempUser.png' : "../images/"+image} alt="user"/>
              <small>{firstName}</small>
              <CaretUpFill/>
            </div>
            <div className="show-btn2 " onClick={showSettingsBar} style={{cursor: 'pointer'}} id="show-btn2">
              <img src={image === 'no' ? '../images/tempUser.png' : "../images/"+image} alt="user"/>
              <small>{firstName}</small>
              <CaretDownFill/>
            </div>
            <div className="dropdown-content d-none" id='dropdown'>
              <div className="text-center">
                <h6>{firstName + " " + lastname}</h6>
                <small className='text-center'>{role}</small>
              </div>
              <hr />
              <div  className="hide-link text-center">
                <Link to={'/admin/settings'} style={{textDecoration: 'none', color: 'rgb(17, 20, 54)',  fontSize: '1.2rem'}}><GearWideConnected/> <small>Settings</small> </Link>
              </div>
              <div className='hide-link text-center' style={{color: 'rgb(17, 20, 54,)', fontSize: '1.2rem', cursor: 'pointer'}} onClick={signOut}>
                <BoxArrowInDownLeft/> <small>Sign Out</small>
              </div>
            </div>            
          </div>
        </header>
      </div>
    </div>

  )
}

export default Navbar