import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import './new-letter.css';
import NewCreateLetter from '../new-create-letter';
import Newletterwithoutpayment from '../new-create-letter-withoutpayment';
import { useAuth } from "../../AuthContext"; 


function NewLetter() {
    const [showRegister, setShowRegister] = useState(false); 
    const [paymentExists, setPaymentExists] = useState(false);
    useEffect(()=>
    {
      handleCreateNewCoverLetter();
    })
    
    //new one
    const handleCreateNewCoverLetter = async () => {
      try {
        const email = user;
    
        const response = await fetch(`http://localhost:5000/check-payment?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
    
        const responseData = await response.json();
    
        if (responseData.message === "Payment exists and subscription is active" || responseData.message === "Payment exists and subscription is in the trialing state") {
          console.log(responseData);
          setPaymentExists(true);
        } 
        else if (responseData.message === "Subscription cancel at this time" && responseData.subscriptioncanceled) {
          const canceledTimestamp = new Date(responseData.subscriptioncanceled);
          const createdTimestamp = new Date(responseData.timestamp);
          const daysDifference = Math.floor((canceledTimestamp - createdTimestamp) / (1000 * 60 * 60 * 24)); 
          console.log(daysDifference);
         
          if (daysDifference <= 30) {
            
            setPaymentExists(true);
          } else {
            setPaymentExists(false); 
          }
        } 
        else {
          console.log(responseData);
          setPaymentExists(false); 
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    

    const { logout } = useAuth();
    const { user } = useAuth();
    const handleLogout = () => {
      logout();
      window.location.href= ("/");
    };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmailFromURL = searchParams.get('userEmail'); 
  const userEmail = userEmailFromURL || user;
    useEffect(() => {
    }, [user]);
    return (
      <>
      <div className='dashboard-whole-container'>
        <div className='left-dashboard-container'>
          <div className='left-dashboard-logo'>
             <Link to="/">  <img src={logo} alt="Logo" className="dashboard-logo" /></Link>
             <h6 className='dashboard-email'>{userEmail}</h6>
          </div>
          <div className='left-dashboard-second-container'>
          <a className='left-dashboard-second-container-button' href='/client/new-letter' onClick={handleCreateNewCoverLetter}>
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
            {paymentExists ? <Newletterwithoutpayment /> :<NewCreateLetter/> }
          </div>
        </div>
      </div>
      </>
    )
}
export default NewLetter