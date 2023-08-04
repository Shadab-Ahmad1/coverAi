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
                Your subscription will be canceled immediately following your
                request.No additional fees will be charged to your card.If the
                subscription to the service has already been taken{" "}
              </p>{" "}
              <input
                type="email"
                placeholder="Email used during subscription"
              />{" "}
              <button className="button"> I Confirm My Subscription </button>{" "}
              <p className="p-center">
                {" "}
                If you cannot find the email address used when you registered,
                please contact us by email or by phone so that we can help you
                finalize your unsubscription.{" "}
              </p>{" "}
              <input
                className="card-num"
                type="email"
                maxLength="6"
                placeholder="the first 6 digit of the card"
              />{" "}
              <input
                className="card-num"
                type="email"
                maxLength="4"
                placeholder="the last 4 digit of the card"
              />{" "}
              <button className="button"> I Confirm My Unsubscription </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Unsubscribe;
