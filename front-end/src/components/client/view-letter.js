import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import './view-letter.css';
import Register from '../Register';
import { useAuth } from "../../AuthContext"; 

function ViewLetter() {
    const [showRegister, setShowRegister] = useState(false); 
    const handleCreateNewCoverLetter = () => {
      setShowRegister(true);
    };
    const { logout } = useAuth();
    const { user } = useAuth();
  
    const handleLogout = () => {
      logout();
      window.location.href= ("/");
    };
    useEffect(() => {
    }, [user]);
  
    return (
      <>
      <div className='dashboard-whole-container'>
        <div className='left-dashboard-container'>
          <div className='left-dashboard-logo'>
             <Link to="/">  <img src={logo} alt="Logo" className="dashboard-logo" /></Link>
             <h6 className='dashboard-email'>{user}</h6>
          </div>
          <div className='left-dashboard-second-container'>
          <a className='left-dashboard-second-container-button' href='/client/view-letter' onClick={handleCreateNewCoverLetter}>
          <span className='circle'>
              <i className='fa fa-plus'></i>
          </span>
            New cover Letter
          </a> 
          </div>
          <div className='left-view-3-container'>
            <a className='left-view-letter-3-container-button' href='/client/dashboard'>
              <div className='second-view-img'></div>
             <lable className='class-view-label'>Cover Letters</lable> 
            </a>
          </div>
          <div className='left-dashboard-4-container'>
            <a className='left-dashboard-4-container-button' onClick={handleLogout}>
              <div className='logout-img'></div>
             <lable className='label-class'>Logout</lable> 
            </a>
          </div>
         </div>
         <div className='right-dashboard-container'>
         <div className='right-dashboard-second-container'>
            <Register />
         </div>
         
        </div>
      </div>
      </>
    )
}

export default ViewLetter