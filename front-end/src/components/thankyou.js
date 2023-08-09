import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./thankyou.css";


function Thankyou({}) {
    const location = useLocation();
    const paymentId = new URLSearchParams(location.search).get('paymentId');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [showCoverLetter, setShowCoverLetter] = useState(false);
    const [typedCoverLetter, setTypedCoverLetter] = useState(""); 


    useEffect(() => {
        if (paymentId) {
          fetchPaymentDetails(paymentId);
        }
      }, [paymentId]);

      const fetchPaymentDetails = async (paymentId) => {
        try {
          const response = await axios.get(`http://localhost:5000/getCoverletter/${paymentId}`); 
          console.log(response);
          setPaymentDetails(response.data);
        } catch (error) {
          console.error('Error fetching payment details:', error);
        }
      };

      const handleShowCoverLetter = () => {
        setShowCoverLetter(true);
        const words = paymentDetails?.coverLetter.split(' ');
        let currentIndex = 0;
        let typedText = "";
      
        const typingInterval = setInterval(() => {
          if (currentIndex < words.length) {
            typedText = words.slice(0, currentIndex + 1).join(' ');
            setTypedCoverLetter(typedText);
            currentIndex++;
          } else {
            clearInterval(typingInterval);
          }
        }, 100); 
      };
      

 return (
    <>
      <section className="thankyou-whole-wrapper" id="thankyou-whole-wrapper">
        <div className="container-fluid white-rectangle">
          <div className="col-sm-6 text-center" id="thankYouContainer">
            <h1 className="thanks text-center">Thank You !</h1>
            <p className="user-email-text">
              Thank you for choosing CoverAi.<br /> Please check your email <br /><b>{paymentDetails?.email}</b>
            </p>
            <p className="thanks-description"> You have been sent a link to view your cover letter.
              If you do not receive any email Please contact our customer service team at <a href="mailto:info+coverai@yeesshh.com">info+coverai@yeesshh.com</a>.</p>
          </div>
          <div className="col-sm-6" id="loadingContainer">
            <div className="thank-you" id="coverLetterButton">
              {!showCoverLetter ? (
                <><button className="btn button7" onClick={handleShowCoverLetter}>Show Letter</button><p>Your Cover letter has been created!</p></>
              ) : (
                <>
                  <p className='coverLetterText'>{typedCoverLetter}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Thankyou;
