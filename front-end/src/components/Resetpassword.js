import React, { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
 
  const { token } = useParams();
  const navigate=useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  }, [token]);
  useEffect(() => {
    // Fetch user's email from the backend using the token
    fetch(`http://localhost:5000/get-user-email/${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.email) {
          setUserEmail(data.email);
        } else {
          // Handle case where email couldn't be retrieved
        }
      })
      .catch(error => {
        console.error('Error fetching user email:', error);
      });
  }, [token]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("The password confirmation does not match.");
      return;
    }
    setIsSubmitting(true);
    setMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        navigate(`/client/dashboard?userEmail=${encodeURIComponent(userEmail)}`);
      } else {
        setMessage("An error occurred while resetting the password.");
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
    
    <div className="regsiter-section1">
    <div className="container-register-wrapper">
      <h1 className="newaccount-h1"> Reset Password </h1>
      <div className="container-2-Register" id="container-2-Register">
        <div className="form-main">
          <div className="form">
          <input
              className="bhai-te"
              type="text"
              value={userEmail}
              disabled 
            />
             <input
              className="bhai-te"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
             <input
              className="bhai-te"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {message && <p className="get-message">{message}</p>}
            <div className="text">
              <button className="Reset-page-button"  onClick={handleResetPassword} disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>{" "}
              
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
  </div>{" "}
 </>
  );
}

export default ResetPassword;
