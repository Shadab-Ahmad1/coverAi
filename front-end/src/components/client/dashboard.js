import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import './dashboard.css';

function Dashboard() {
  return (
    <>
    <div className='dashboard-whole-container'>
      <div className='left-dashboard-container'>
        <div className='left-dashboard-logo'>
           <Link to="/">  <img src={logo} alt="Logo" className="dashboard-logo" /></Link>
           <h6 className='dashboard-email'>aliimran98887@gmail.com</h6>
        </div>
        <div className='left-dashboard-second-container'>
          <a className='left-dashboard-second-container-button'>
            <span>
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
            <span>
            <i></i>
            </span>
            Cover Letter
          </a>
        </div>
        <br></br>
        <br></br>
        <hr className='line'/>
        <div className='left-dashboard-4-container'>
          <a className='left-dashboard-4-container-button'>
            <span>
            <i></i>
            </span>
            Logout
          </a>
        </div>
      </div>
      <div className='right-dashboard-container'>

      </div>
    </div>
    </>
  )
}

export default Dashboard