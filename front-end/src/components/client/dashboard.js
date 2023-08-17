import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import img from "../../assets/icon-cover.png";
import './dashboard.css';
import logoutImg from "../../assets/logout.png";
import { useAuth } from "../../AuthContext"; // Path to your AuthContext.js

function Dashboard() {

  const { user } = useAuth();

  useEffect(() => {
    console.log('User in Dashboards email', user);
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
        <a className='left-dashboard-second-container-button'>
        <span className='circle'>
            <i className='fa fa-plus'></i>
        </span>
          New cover Letter
        </a> 
        </div>
        <br></br>
        <br></br>
        <hr className='line'/>
        <div className='left-dashboard-3-container'>
          <a className='left-dashboard-3-container-button'>
            <span className='second-span'>
            <i> <img className='second-img' src={img} /></i>
            </span>
            Cover Letter
          </a>
        </div>
        <br></br>
        <br></br>
        <hr className='line'/>
        <div className='left-dashboard-4-container'>
          <a className='left-dashboard-4-container-button'>
            <span >
              <img  className='third-img' src= {logoutImg} alt='no img' />
            </span>
            Logout
          </a>
        </div>
       </div>
       <div className='right-dashboard-container'>
       <div className='right-dashboard-second-container'>
       
       </div>
       
      </div>
    </div>
    </>
  )
}

export default Dashboard