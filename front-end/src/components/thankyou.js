import React from "react";
import "./thankyou.css";

function thankyou() {
  return (
    <>
    <section className="thankyou-whole-wrapper" id="thankyou-whole-wrapper">
        <div className="container-fluid white-rectangle">
            <div className="col-sm-6 text-center" id="thankYouContainer">
                        <h1 className="thanks text-center">Thank You !</h1>
                        <p className="user-email-text">
                            Thank you for choosing CoverAi.<br /> Please check your email <br /><b>ashadab124@gmail.com</b>
                        </p><p className="thanks-description"> You have been sent a link to view your cover letter.
                            If you do not receive any email Please contact our customer service team at <a href="mailto:info+coverai@yeesshh.com">info+coverai@yeesshh.com</a>.</p>
            </div>
            <div className="col-sm-6" id="loadingContainer">
                        <div className="thank-you" id="coverLetterButton">
                            <button className="btn button7">Show Letter</button>
                            <p>Your Cover letter has been created!</p>
                        </div>
            </div>
        </div>
    </section>
    </>
  );
}

export default thankyou;
