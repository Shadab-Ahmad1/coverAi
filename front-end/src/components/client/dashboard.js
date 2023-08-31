import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import img from "../../assets/icon-cover.png";
import './dashboard.css';
import { useAuth } from "../../AuthContext"; 
import axios from 'axios';
function Dashboard() {
  const [showRegister, setShowRegister] = useState(false); 
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(null);
  const handleCreateNewCoverLetter = () => {
    setShowRegister(true);
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
  const [error, setError] = useState('');
  useEffect(() => {
   
  }, [user]);
  useEffect(() => {
    fetchCoverLetters();
  }, []);
 
  const [successfulPayments, setSuccessfulPayments] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const userEmail=user;
  const fetchCoverLetters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCoverLetters', {
        params: { userEmail }
      });    
      setCoverLetters(response.data);
    } catch (error) {
      setError('An error occurred while fetching cover letters.');
    } 
  };
  

  return (
    <>
    <div className='dashboard-whole-container'>
      <div className='left-dashboard-container'>
        <div className='left-dashboard-logo'>
           <Link to="/">  <img src={logo} alt="Logo" className="dashboard-logo" /></Link>
           <h6 className='dashboard-email'>{userEmail}</h6>
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
          <a className='left-dashboard-3-container-button' href='/client/dashboard' >
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
    {coverLetters.length === 0 ? (
      <p className='main-p-box empty'>
        Looks like you haven't created a cover letter yet! Please click on  
        <strong> New Cover Letter </strong>
        button to create one.
      </p>
    ) : (
      coverLetters.map((coverLetter, index) => (
       
        <div key={index} className= "letter-card-container"> 
        <Link  to={`/client/letter/?coverLetter=${encodeURIComponent(coverLetter.coverLetter)}`}
        style={{ textDecoration: 'none' }}>
          <button 
            className='p-box'
            onClick={() => {
              setSelectedCoverLetter(coverLetter);
              setSelectedCoverIndex(index);
              
            }}
          >
         <p className='record-class'><b> Position is for {coverLetter.jobtitle} </b> 
         <p className='company-data'>-{coverLetter.companyname} </p>
         <p className='time-stamp'> {coverLetter.timestamp}</p>
          </p> 
          </button>
          </Link>
         
        </div>
     
      ))
    )}
  </div>
  {selectedCoverLetter && (
    <div className='right-card-container'>
      <p>Cover Letter: {selectedCoverLetter.coverLetter}</p>  
    </div>
  )}
</div>

        </div>
      </div>
    </>
  )
}
export default Dashboard