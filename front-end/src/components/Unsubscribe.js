import React from "react";
import { useState } from "react";
import "./Newaccount.css";
import "./Unsubscribe.css";
import { loadStripe } from "@stripe/stripe-js";

function Unsubscribe() {
  const [userEmailValue, setUserEmail] = useState("");
  const handleUnsubscribeClick = async () => {
    // Load the Stripe publishable key
    const stripe = await loadStripe("pk_test_51NaeWpDY7WDwWj6eXGb42lHuzCQC2hHIl6J8hFGaX1BsxDmQo0L3gzQsou2vYBcHvxf28Iw0HGa7xvXNhNNtM2vi00etx6NicV");

    // Create a checkout session for cancellation

      try {
        // ... other code ...
    
        const response = await fetch("http://localhost:5000/cancel-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userEmailValue,
          }),
        });
    
        const result = await response.json();
    
        console.log(result.message); // Logging the cancellation message
    
        // Redirect to a success page after successful subscription cancellation
        if (response.ok) {
          window.location.href = '/cancellation-success'; // Replace with your success page URL
        } else {
          console.error("Error cancelling subscription");
        }
      } catch (error) {
        console.error("Error:", error);
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
