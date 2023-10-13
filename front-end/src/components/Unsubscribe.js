import React, { useState } from "react";
import { useAuth } from "../AuthContext"; 
import './Unsubscribe.css';

function Unsubscribe() {
  const { isAuthenticated, user } = useAuth(); 
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleCancelSubscription = async () => {
    if (!emailRegex.test(email)) {
      setStatusMessage("Please provide a valid email address.");
      return;
    }
    if (!user) {
      setStatusMessage("You must be logged in to unsubscribe.");
      console.log(user)
      return;
    }
    if (email !== user) {
      setStatusMessage("please write your correct email.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/cancel-sub-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(`Subscription successfully ${data.status}`);
      } else {
        const json = await response.json();
        setStatusMessage(json.error || "An error occurred during cancellation.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred while processing the request.");
    }
  };
  const handleEmailClick = () => {
    setStatusMessage("");
  };
  return (
    <>
      <section>
        <div className="pic">
          <div className="major-div">
            <h1 className="unsubscribe-h1">Cancel My Request</h1>
            <div className="container-unsubscribe">
              <p className="unsub-p">
                Your subscription will be canceled immediately following your request. No additional fees will be charged to your card. If the subscription to the service has already been taken for the period to come, you can continue to access the site and its services until the end of the period.
              </p>
              <input
                placeholder="Enter your email"
                className="unsub-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={handleEmailClick}
              />
              {isAuthenticated ? (
                <button className="button" onClick={handleCancelSubscription}>
                  Click Here To Unsubscribe
                </button>
                
              ) : (
                <p>You must be logged in to unsubscribe.</p>
              )}
              {statusMessage && <span className="unsubscribe-p">{statusMessage}</span>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Unsubscribe;

