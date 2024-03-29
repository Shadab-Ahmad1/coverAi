import React from "react";
import  { useState, useEffect } from "react";
import axios from "axios";
import "./new-create-letter.css";
import { useAuth } from "../AuthContext"; 

function NewCreateLetter()
{
    const { user } = useAuth();
    const [result, setResult] = useState(null);
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [formDataArray, setFormDataArray] = useState([]);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [TypedCoverLetter, setTypedCoverLetter]=useState('');
    const [formData, setFormData] = useState({
      name:"",
      jobTitle: "",
      companyName: "",
      relevantWorkExperience: "",
      keyachievments: "",
      educationLevel: "",
      majorOrAreaOfStudy: "",
      notableAccomplishments: "",
      requiredQualifications: "",
      qualificationsMatch: "",
      interestedforjob: "",
      motivationStatement: "",
    });


    console.log(user);
  //Local Storage for input
  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    localStorage.setItem("formData", JSON.stringify(formData));
   
  };
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);
  
  
    useEffect(() => {
      const FirstloaderTimeout = setTimeout(() => {
        setShowFirstLoader(false);
      },500);
      return () => clearTimeout(FirstloaderTimeout);
    }, []);
    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          const button = document.getElementById('Button');
          if (button) {
            button.click();
          }
        }
        if (event.ctrlKey && event.key === 'Enter') {
          const button = document.getElementById('Sub-Button');
          if (button) {
            button.click();
          }
        }
      };
    
      window.addEventListener('keydown', handleKeyPress);
    
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
    const [submitted, setSubmitted] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [showFirstLoader, setShowFirstLoader] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [coverLetterText, setCoverLetterText] = useState("");
    const [coverLetterSubmitToDb, setCoverLetterSubmitToDb] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
      "Machines working hard to generate your cover letter",
      "Sit back, relax, and wait for it...",
      "Just a moment longer, the perfect cover letter is on its way...",
      "Thanks for your patience. Your wait will be worth it!"
    ];
    useEffect(() => {
      const messageInterval = 2000; 
      const transitionInterval = 1300; 
      const showNextMessage = () => {
        if (messageIndex < messages.length - 1) {
          setMessageIndex(prevIndex => prevIndex + 1);
        }
      };

      if (showLoader) {
        const messageTimer = setInterval(showNextMessage, messageInterval + transitionInterval);
        return () => clearInterval(messageTimer);
      }
    }, [showLoader, messageIndex]);
  
    const generateCoverLetter = async () => {
      const apiKey = process.env.REACT_APP_CHAT_GPT_API_KEY;
      setShowLoader(true);
      setShowFirstLoader(false)
      const headers = {
        Authorization: `Bearer ${apiKey}`,
      };
      const requestBody = {
        messages: [
          {
            role: "user",
            content: `You are a helpful assistant that helps users write quality cover letters. The user has been prompted with many questions through a typeform based questionnaire and has provided answers to help craft the letter. The assistant\'s answer must be formatted in simple document, with all necessary tags except style tag for a coherent output as if the letter was in an email to be sent. Just don\'t include any links as clickable. The applicant provides his name in ${formData.name} and company name in ${formData.companyName} information on the role he is applying to in ${formData.jobTitle} and ${formData.relevantWorkExperience} and ${formData.keyachievments} is regarding his past or current experience.`,
          },
        ],
        model: "gpt-3.5-turbo",
      };
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          requestBody,
          { headers }
        );
        if (response.status === 200) {
          const coverLetter = response.data.choices[0].message.content;
          setCoverLetterSubmitToDb(coverLetter);
          setCoverLetterText(coverLetter);
          setShowContent(true);
          
        }
      } catch (error) {
        setShowLoader(false);
        console.error("Error:", error.message);
      }
    };
    const handleShowLetterClick = () => {
      setCurrentDisplayIndex(0); 
      setShowContent(true); 
      typeOutCoverLetter();
    };
    const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
    const [reachedHalfway, setReachedHalfway] = useState(false);
    
    const typeOutCoverLetter = () => {
      setCoverLetterText(true);
      setCurrentDisplayIndex(0);
      const totalChars = coverLetterText.split(' ');
      let currentIndex= 0;
      let typeText="";
      const typeInterval = setInterval(() => {
        const halfwayIndex = Math.floor(totalChars.length/1.2); 
        if (currentIndex< halfwayIndex) {
          typeText =totalChars.slice(0,currentIndex+1).join(' ');
          setTypedCoverLetter(typeText);
          setCurrentDisplayIndex(currentIndex);
          console.log(TypedCoverLetter);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100); 
    };  
    useEffect(() => {
   
      if (currentDisplayIndex == 120) {
        setReachedHalfway(true);
        setTypedCoverLetter(false);
      }
    }, [TypedCoverLetter, coverLetterText]);
    const [responseOk, setResponseOk] = useState(false);

    

    const stripefunction = async () => {
      try {
        const price_id='price_1NqG3DDY7WDwWj6eeEfQCXhH';
        const response = await fetch('http://localhost:5000/create-checkout-session-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            items: [{ id: price_id, amount :100}], 
            jobtitle: formData.jobTitle,
            companyname: formData.companyName,
            coverLetterResponse: coverLetterSubmitToDb,
            userEmail: user,
          }),
        });
  
        if (response.ok) {
          setResponseOk(true); 
          const { url } = await response.json();
          window.location = url;
        } else {
          const json = await response.json();
          console.log(json.error);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      const loaderTimer = setTimeout(() => {
        setShowLoader(false);
        setShowContent(true);
      }, 1000);
  
      return () => {
        clearTimeout(loaderTimer);
      };
    }, [coverLetterText]);
  
    const handleNext = (data) => {
      if (step === 19) {
        if (!isValidEmail) {
          alert("Please enter a valid email address.");
          return;
        }   
       } 
       setStep(step + 1);
       setFormData((prevData) => ({ ...prevData, ...data }));
    };
  
    const handleSubmit = async () => {
      setSubmitted(true);
      generateCoverLetter();
      console.log(formData);
      setFormDataArray((prevArray) => [...prevArray, formData]);
    
        localStorage.removeItem("formData");   
    };

    const isButtonEnabled = () => {
      let errorMessage = "";
      switch (step) {
        case 1:
          return { enabled: true, errorMessage: "" };
          case 3:
            errorMessage = (formData.name.trim() !== "") ? "" : "Please fill this in";
            return { enabled: errorMessage === "", errorMessage };
        case 4:
          errorMessage =
            formData.jobTitle.trim() !== "" ? "" : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 5:
          errorMessage =
            formData.companyName.trim() !== "" ? "" : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 6:
          errorMessage =
            formData.relevantWorkExperience.trim() !== ""
              ? ""
              : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 7:
          errorMessage =
            formData.keyachievments.trim() !== "" ? "" : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 9:
          errorMessage =
            formData.educationLevel.trim() !== "" ? "" : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 10:
          errorMessage =
            formData.majorOrAreaOfStudy.trim() !== ""
              ? ""
              : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 11:
          errorMessage =
            formData.notableAccomplishments.trim() !== ""
              ? ""
              : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 12:
          errorMessage =
            formData.requiredQualifications.trim() !== ""
              ? ""
              : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 13:
          errorMessage =
            formData.qualificationsMatch.trim() !== ""
              ? ""
              : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        case 14:
          errorMessage =
            formData.interestedforjob.trim() !== "" ? "" : "Please fill this in";
          return { enabled: errorMessage === "", errorMessage };
        default:
          return { enabled: true, errorMessage: "" };
      }
    };
    const renderSteps = () => {
      const { enabled, errorMessage } = isButtonEnabled();
      switch (step) {
        case 1:
          return (
            <div>
            {showFirstLoader ? (
              <div className="loader"></div>
            ) : (
              <div className="render-in">
                <h2> Free great cover letter in seconds </h2>
                <h3 className="render-in-h3"> AI powered </h3>
                <div className="render-in-div2">
                  <div className="render-in-btn-main">
                    <div className="render-in-btn">
                      <button id="Button" onClick={() => handleNext({})}>
                        Start now
                      </button>
                    </div>
                    <div className="render-in-div2-part">
                      press <strong> Enter↵ </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );    
        case 2:
          return (
            <div className="question-1-div4">
              <h2> OK let 's get started.</h2>{" "}
              <h2> First some details about you... </h2>{" "}
              <div className="question-1-div4-main">
                <div className="question-1-div4-btn">
                  <button id="Button" onClick={() => handleNext()}> Start </button>{" "}
                </div>{" "}
                <div className="render-in-div4-part">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
          case 3:
            return (
              <div className="question-2-main">
                <div className="question-2-header">
                  <h2> OK let 's get started. First some details about you...</h2>{" "}
                </div>{" "}
                <div className="question-2-section2">
                <div className="question-1-header">
                  <h2>  Before we start, can we get your first name ?  </h2>{" "}
                  <input
                    type="text"
                    placeholder="Type your answer here"
                    className="input-question-2"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    
                  />{" "}
                  <div className="question-2-btn-main">
                    <div className="question-2-btn ">
                      <button id="Button"
                        onClick={() => handleNext()}
                        disabled={errorMessage !== ""}
                      >
                        {" "}
                        Ok ✓{" "}
                      </button>{" "}
                    </div>{" "}
                    <div className="question-2-data">
                      press <strong> Enter↵ </strong>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                </div>
              </div>
            );

        case 4:
          return (
            <div className="question-2-main">
              <div className="question-2-header">
                <h2> OK let 's get started. First some details about you...</h2>{" "}
              </div>{" "}
              <div className="question-2-section2">
              <div className="question-1-header">
                <h2> What is the job title you are applying for ? * </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-2"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  
                />{" "}
                <div className="question-2-btn-main">
                  <div className="question-2-btn ">
                    <button id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-2-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              </div>
            </div>
          );
        case 5:
          return (
            <div className="question-2A-main">
              <div className="question-2-header">
                <h2> OK let 's get started. First some details about yo...</h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2>
                  {" "}
                  What is the name of the company/organization you are applying
                  to ? *{" "}
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-2"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                />{" "}
              
                <div className="question-2-btn-main">
                  <div className="question-2-btn ">
                    <button id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-2-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 6:
          return (
            <div className="question-2B-main">
              <div className="question-2-header">
                <h2> OK let 's get started. First some details about yo...</h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2>
                  {" "}
                  What relevant work experiences would you like to mention ? *{" "}
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-2"
                  value={formData.relevantWorkExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relevantWorkExperience: e.target.value,
                    })
                  }
                />{" "}
             
                <div className="question-2-btn-main">
                  <div className="question-2-btn ">
                    <button id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-2-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 7:
          return (
            <div className="question-3-main">
              <div className="question-3-header">
                <h2> One last question about you: </h2>{" "}
                <h2> What are the key achievements from your relevant past experiences that you would like to highlight? </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-3"
                  value={formData.keyachievments}
                  onChange={(e) => handleInputChange("keyachievments", e.target.value)}
                  
                />{" "}
          
                <div className="question-3-btn-main">
                  <div className="question-3-btn ">
                    <button id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-3-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 8:
          return (
            <div className="question-4-main">
              <div className="question-4-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
                <div className="question-4-btn-main">
                  <div className="question-4-btn">
                    <button id="Button" onClick={() => handleNext()}> Bring them on! </button>{" "}
                  </div>{" "}
                  <div className="question-4-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 9:
          return (
            <div className="question-5-main">
              <div className="question-5-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2> What is your highest level of education ? * </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                />{" "}
              
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 10:
          return (
            <div className="question-5b-main">
              <div className="question-5-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2> What was your major or area of study ? * </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.majorOrAreaOfStudy}
                  onChange={(e) => handleInputChange("majorOrAreaOfStudy", e.target.value)}
                />{" "}
               
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 11:
          return (
            <div className="question-5c-main">
              <div className="question-5-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2>
                  {" "}
                  Did you achieve any notable accomplishments during your
                  education(e.g., awards, honors, leadership roles) ? *{" "}
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.notableAccomplishments}
                  onChange={(e) => handleInputChange("notableAccomplishments", e.target.value)}
                />{" "}
              
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button  id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 12:
          return (
            <div className="question-5d-main">
              <div className="question-5-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2>
                  {" "}
                  What are the required qualifications / skills for the job ? *
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.requiredQualifications}
                  onChange={(e) => handleInputChange("requiredQualifications", e.target.value)}
                />{" "}
               
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button  id="Button"
                      onClick={() => handleNext()}
                      enabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 13:
          return (
            <div className="question-5e-main">
              <div className="question-5-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2>
                  How do your qualifications / skills match those required ? *
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.qualificationsMatch}
                  onChange={(e) => handleInputChange("qualificationsMatch", e.target.value)}
                />{" "}
              
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button  id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 14:
          return (
            <div className="question-5f-main">
              <div className="question-5-header">
                <h2> Thanks!Just a few more questions... </h2>{" "}
              </div>{" "}
              <div className="question-1-header">
                <h2>
                  Almost there!Why are you interested in this job position at this
                  particular company / organization ? *
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.interestedforjob}
                  onChange={(e) => handleInputChange("interestedforjob", e.target.value)}
                />{" "}            
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button  id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      {" "}
                      Ok ✓{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 15:
          return (
            <div className="question-5g-main">
              <div className="question-1-header">
                <h2>
                  {" "}
                  ...and that 's the end of the exam. Wasn' t too hard, right ?{" "}
                </h2>{" "}
                <h2> OK, final question.
                {" "}
                  Provide a closing statement that summarizes your motivation for
                  applying and reiterates your interest in the position ?{" "} </h2>{" "}            
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="input-question-5"
                  value={formData.motivationStatement} 
                  onChange={(e) => handleInputChange("motivationStatement", e.target.value)}
                />{" "}
                <h5> Shift⇧ + Enter↵ to make a line break </h5>{" "}              
                <div className="question-6-btn-main">
                  <div className="question-5-btn">
                    <button  id="Button"
                      onClick={() => handleNext()}
                      disabled={errorMessage !== ""}
                    >
                      Ok {" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-6-data">
                    press <strong> Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 16:
          return (
            <div className="question-final-main">
              {" "}
              <div className="question-5-div1">
                <h2> You made it!Are you ready to see your cover letter ? </h2>{" "}
                <p> Hope you like it. </p>{" "}
                <div className="question-5-btn-main">
                  <div className="question-5-btn">
                    <button id="Sub-Button"                   
                      onClick={() => {
                        handleSubmit();
                        handleNext();
                      }}
                    >
                      {" "}
                      Submit{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="question-5-data">
                    press <strong>Ctrl+Enter↵ </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        case 17:
          return (
            <div className="submitted-data">
              <div className="submitted-data-div2">
                <div className="container">
                  <div className="whole-cover-letter-wrapper">
                    <div className="left-container">
                      <h1 className="h1-left-container"> Thanks </h1>
                      <p>
                        Your cover letter is being generated with the assistance of AI. Nice, right? 
                        <br/>
                        (If nothing loads, please refresh the page)
                      </p>
                    </div>
                    <div className="right-container">
                      {/* Show loader until API response is received */}
                      {showLoader && (
                         <div className="cover-letter-loader-whole">
                           <div className="cover-loader"></div>
                           <div className="cover-loader-main">
                                 <p>{messages[messageIndex]}</p>
                           </div>
                         </div>
                      )}
                      {!showLoader && (
                <div className="button-text-center" id="coverLetterButton">
                  <button id="Button" className="show-cover-letter-button" onClick={() => { handleShowLetterClick(); handleNext(); }}>
                    Show Letter
                  </button>
                  
                  <p> Your Cover letter has been created </p>
                  <p>{result}</p>
                </div>
              )}
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          );
          case 18:         
            return (
            <div className="coverLetterWholeWrapper">            
               <p className="type-writer-cover-letter" >{TypedCoverLetter}</p>             
               {reachedHalfway && (
                <div className="blur-background">
                  <div className="coverLetterdivwrapper-2">
                    <div id="coverLetterDiv" className="stripe-button-whole-wrapper">  
                    <p> To see the full letter try for free! </p>    
                    <button id="Button" className="stripe-button" onClick={stripefunction}>
                     
                     <div className="test-mode-wrapper"> <h6 className="test-mode">TEST MODE</h6></div>
                     <p>Try now</p>
                     </button>
                     </div>
                  </div>
                </div>
              )}
            </div>
          );
        default:
          return null;
      }
    };
    return (
      <div>
      <section className="container-wraper">
        {" "}
        {showLoader && (
          <div className="loader-container">          
          </div>
        )}{" "}
      
        {showFirstLoader && (
          <div>
            <div className="loader"></div>{" "}
          </div>
        )}
        {showContent && renderSteps()}{" "}
      </section>{" "}
    </div>
    );  
};
export default NewCreateLetter