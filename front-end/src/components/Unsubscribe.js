import React from "react";
import "./Newaccount.css";
import "./Unsubscribe.css";

function Unsubscribe() {
  return (
    <>
      <section>
        <div className="pic">
          <div className="major-div">
            <h1 className="unsubscribe-h1"> Cancel My Request </h1>{" "}
            <div className="container-unsubscribe">
              <p className="unsub-p">
                {" "}
                Your subscription will be canceled immediately following your request. No additional fees will be charged to your card.
                If the subscription to the service has already been taken for the period to come, you can continue to access the site and its services until the end of the period.
              </p>{" "}
            
              <button className="button"> Click Here To Unsubscribe </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Unsubscribe;
