import React from 'react';
import { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import img from "../../assets/icon-cover.png";
import './letter.css';
import { useAuth } from "../../AuthContext"; 

function Letter() {  
    const location = useLocation();
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(false);
    const [copyButtonClicked, setCopyButtonClicked] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    const coverLetter = searchParams.get('coverLetter');
    const [typedCoverLetter, setTypedCoverLetter] = useState('');
    const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
    const [showRegister, setShowRegister] = useState(false); 
    const [selectedCoverIndex, setSelectedCoverIndex] = useState(null);
    const handleCreateNewCoverLetter = () => {
      setShowRegister(true);
    };
    const { logout } = useAuth();
    const { user } = useAuth();
    const handleLogout = () => {
      logout();
      window.location.href= ("/");
    }; 
    const [error, setError] = useState('');
    useEffect(() => {
    }, [user]);
    //Typeout function
    const typeOutCoverLetter = () => {
        setCurrentDisplayIndex(0);
        const totalChars = decodeURIComponent(coverLetter).split('');
        let currentIndex = 0;
        let typeText = '';
        const typeInterval = setInterval(() => {
          if (currentIndex < totalChars.length) {
            typeText = totalChars.slice(0, currentIndex + 1).join('');
            setTypedCoverLetter(typeText);
            setCurrentDisplayIndex(currentIndex);
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            setShowCopyButton(true);
            setShowDownloadButton(true);
          }
        }, 50);
      };

      //  download and copy button
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
                    font-size: 16px;
                    white-space: pre-line;
                    color: #3d3d3d;
                    line-height: 24px;
                    letter-spacing: 0.7px;
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
        setCopyButtonClicked(true); 
        setTimeout(() => {
          setCopyButtonClicked(false); 
        }, 400); 
      };
  
      useEffect(() => {
        typeOutCoverLetter();
      }, []);
    const userEmail=user;
    return (
      <>
      <div className='dashboard-whole-container'>
        <div className='left-dashboard-container'>
          <div className='left-dashboard-logo'>
             <Link to="/">  <img src={logo} alt="Logo" className="dashboard-logo" /></Link>
             <h6 className='dashboard-email'>{userEmail}</h6>
          </div>
          <div className='left-dashboard-second-container'>
          <a className='left-dashboard-second-container-button' onClick={handleCreateNewCoverLetter} href='/client/new-letter'>
          <span className='circle'>
              <i className='fa fa-plus'></i>
          </span>
            New cover Letter
          </a> 
          </div>
          <div className='left-dashboard-3-container'>
            <a className='left-dashboard-3-container-button' href='/client/dashboard' >
              <span className='second-span'>
              <i> <img className='second-img' src={img} /></i>
              </span>
              Cover Letters
            </a>
          </div>
          <div className='left-dashboard-4-container'>
            <a className='left-dashboard-4-container-button' onClick={handleLogout}>
              <div className='logout-img'></div>
             <lable className='label-class'>Logout</lable> 
            </a>
          </div>
         </div>
         <div className='right-dashboard-container'>
         <div className='right-dashboard-second-container'>
         <div className='right-card-container'>
            <div className='type-writer-background'>
           <p className='type-letter-cover'>{typedCoverLetter}</p>
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
           </div>
         </div>
         </div>
      </>
    )
  }
export default Letter