import React, { useState } from "react";
import "./Forget.css";

function Forget() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notfoundmessage,setNotFoundMessage]=useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendResetLink = async () => {
    try {
      setIsSending(true);
      const response = await fetch('http://localhost:5000/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message); 
      } else if (response.status === 404) {
        setNotFoundMessage("We can't find a user with that email address.");
      } else {
        setMessage("An error occurred while sending the reset link.");
      }
    } catch (error) {
      console.error('Error sending reset link:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="forget-main">
      <div className="forget-div1">
        <h1 className="forget-h1">Forgot Your Password</h1>
        <div className="forget-div2">
          {!message ? (
            <>
              <p className="forget-p">
                Once you have entered your email, you will receive a confirmation link to reset your password
              </p>
              {!isSending ? (
                <>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <p className="not-found-user">{notfoundmessage}</p>
                  <button className="forget-button" onClick={handleSendResetLink}>Send Reset Link</button>
                </>
              ) : (
                <p>Sending...</p>
              )}
            </>
          ) : (
            <>
            <p className="forget-p">
                Once you have entered your email, you will receive a confirmation link to reset your password
              </p>
            <p className="success-message">{message}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Forget;


