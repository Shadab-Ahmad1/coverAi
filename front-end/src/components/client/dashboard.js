import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import img from "../../assets/icon-cover.png";
import './dashboard.css';

import { useAuth } from "../../AuthContext"; 

function Dashboard() {
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
        <a className='left-dashboard-second-container-button' onClick={handleCreateNewCoverLetter} href='/client/new-letter'>
        <span className='circle'>
            <i className='fa fa-plus'></i>
        </span>
          New cover Letter
        </a> 
        </div>
        <div className='left-dashboard-3-container'>
          <a className='left-dashboard-3-container-button' href='/client/dashboard'>
            <span className='second-span'>
            <i> <img className='second-img' src={img} /></i>
            </span>
            Cover Letters
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
       <div className='right-card-container'>
        <p className='p-box empty'>
        Looks like you haven't created a cover letter yet ! Please click on  
        <strong> New Cover Letter </strong>
        button to create one.
        </p>
       </div>
       </div>
       
      </div>
    </div>
    </>
  )
}

export default Dashboard