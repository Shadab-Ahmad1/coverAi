import React from "react";
import { useState } from "react";
import "./Newaccount.css";
import "./Unsubscribe.css";
import { loadStripe } from "@stripe/stripe-js";

function Unsubscribe() {
  const [userEmailValue, setUserEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const handleUnsubscribeClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: "kon@gmail.com"})
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(`Subscription cancellation status: ${data.status}`);
      } else {
        setStatusMessage("An error occurred while canceling the subscription.");
      }
    } catch (error) {
      setStatusMessage("An error occurred while processing your request.");
    }
  };
  
  return (
    <>
      <section>
        <div className="pic">
          <div className="major-div">
            <h1 className="unsubscribe-h1"> Cancel My Request </h1>
            <div className="container-unsubscribe">
              <p className="unsub-p">
                Your subscription will be canceled immediately following your request. No additional fees will be charged to your card. If the subscription to the service has already been taken for the period to come, you can continue to access the site and its services until the end of the period.
              </p>
              <button className="button" onClick={handleUnsubscribeClick}>
                Click Here To Unsubscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Unsubscribe;
