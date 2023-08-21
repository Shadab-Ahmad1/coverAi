
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import './thankyou.css';

function Thankyou() {
  const location = useLocation();
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const paymentId = new URLSearchParams(location.search).get('paymentId');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [typedCoverLetter, setTypedCoverLetter] = useState('');
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);

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
    const words = paymentDetails.coverLetter.split(' ');
    let currentIndex = 0;
    let typedText = '';

    const typingInterval = setInterval(() => {
      if (currentIndex < words.length) {
        typedText = words.slice(0, currentIndex + 1).join(' ');
        setTypedCoverLetter(typedText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowDownloadButton(true); // Show download button after cover letter is fully rendered
        setShowCopyButton(true); // Show copy button after cover letter is fully rendered
      }
    }, 100);
  };

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Open Sans', sans-serif;
                font-size: 14px;
              }
              pre {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
            </style>
          </head>
          <body>
            <pre>${typedCoverLetter}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = typedCoverLetter;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopyButtonClicked(true); // Set the state to indicate the button was clicked
    setTimeout(() => {
      setCopyButtonClicked(false); // Reset the state after a short delay
    }, 400); // Adjust the duration as needed
  };

  return (
    <>
      <section className="thankyou-whole-wrapper" id="thankyou-whole-wrapper">
        <div className="container-fluid white-rectangle">
          <div className="col-sm-6 text-center" id="thankYouContainer">
            {/* ... Other content ... */}
            <h1 className="thanks text-center">Thank You !</h1>
            <p className="user-email-text">
            Thank you for choosing CoverAi.<br /> Please check your email <br /><b>{paymentDetails.email}</b>          
            </p>
            <p className="thanks-description"> You have been sent a link to view your cover letter.
           If you do not receive any email Please contact our customer service team at <a href="mailto:info+coverai@yeesshh.com">info+coverai@yeesshh.com</a>.</p>
          </div>
          <div className="col-sm-6" id="loadingContainer">
            <div className="thank-you" id="coverLetterButton">
              {!showCoverLetter ? (
                <div>
                  <button className="btn button7" onClick={handleShowCoverLetter}>
                    Show Letter
                  </button>
                  <p>Your Cover letter has been created!</p>
                </div>
              ) : (
                <div>
                  <p className="coverLetterText">{typedCoverLetter}</p>
                </div>
              )}
            </div>
            {showDownloadButton && (
              <button id="download-btn" onClick={handleDownload}>
                <i className="fa fa-download"></i>
              </button>
            )}
            {showCopyButton && (
              <button
                id="copy-btn"
                onClick={handleCopy}
                className={copyButtonClicked ? 'copy-button-clicked' : ''}
              >
                <i className="fa fa-copy"></i>
                {copyButtonClicked && (
                  <div className='copy-button-message-container'>
                    <p className="copy-tooltip">Copy-to-clipboard</p>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Thankyou;

