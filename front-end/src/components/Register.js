import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from '@stripe/stripe-js';

const Register = () => {
  const [inputText, setInputText] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [formDataArray, setFormDataArray] = useState([]);
  const [formData, setFormData] = useState({
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
    fullName: "",
    email: "",
  });
  useEffect(() => {
    const FirstloaderTimeout = setTimeout(() => {
      setShowFirstLoader(false);
    },200);
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
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); 
  const [submitted, setSubmitted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showFirstLoader, setShowFirstLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState("");

  const generateCoverLetter = async () => {
    const apiKey = "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";
    setShowLoader(true);
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    const requestBody = {
      messages: [
        {
          role: "user",
          content: `You are a helpful assistant that helps users write quality cover letters. The user has been prompted with many questions through a typeform based questionnaire and has provided answers to help craft the letter. The assistant\'s answer must be formatted in simple document, with all necessary tags except style tag for a coherent output as if the letter was in an email to be sent. Just don\'t include any links as clickable. The applicant provides his name in ${formData.fullName} and 
          ${formData.companyName} information on the role he is applying to in ${formData.jobTitle} and ${formData.relevantWorkExperience} and ${formData.keyachievments} is regarding his past or current experience.`,
        },
      ],
      // temperature: 0.7,
      // max_tokens: 500,
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
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(coverLetter, "text/html");
          console.log(coverLetter);
          const textContent = htmlDocument.body.textContent;
          const formattedCoverLetter = coverLetter.split('\n').map((char, index) => (
            <React.Fragment key={index}>
              {char}
              <br />
            </React.Fragment>
          ));
        
  setCoverLetterText(formattedCoverLetter);
      setShowContent(true);
      }
    } catch (error) {
      setShowLoader(false);
      console.error("Error:", error.message);
    }
  };
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  const halfwayIndex = Math.floor(currentDisplayIndex / 2);

  const handleShowLetterClick = () => {
    setCurrentDisplayIndex(0); // Reset the display index
    setShowContent(true); // Display the cover letter container
    typeOutCoverLetter();
  };
  
  const typeOutCoverLetter = () => {
    const totalChars = coverLetterText.join('').length;
    let displayIndex = 0;
  
    const typeInterval = setInterval(() => {
      if (displayIndex < totalChars) {
        setCurrentDisplayIndex(displayIndex);
        displayIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); 
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

  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  

  const stripefunction = async () => {

      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items:[
            {id:1, amount: 1000 }
          ],
          email:formData.email,
          name:formData.fullName
        }),
      }).then( res => {
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ url })=>{
        window.location = url
      }).catch(e =>{
        console.log(e.error);
      })
  };


  const handleNext = (data) => {
    setStep(step + 1);
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    generateCoverLetter();
    console.log(formData);
    setFormDataArray((prevArray) => [...prevArray, formData]);
  };

  const isButtonEnabled = () => {
    let errorMessage = "";
    switch (step) {
      case 1:
        return { enabled: true, errorMessage: "" };
      case 2:
        errorMessage = inputText.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 6:
        errorMessage =
          formData.jobTitle.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 7:
        errorMessage =
          formData.companyName.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 8:
        errorMessage =
          formData.relevantWorkExperience.trim() !== ""
            ? ""
            : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 9:
        errorMessage =
          formData.keyachievments.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 11:
        errorMessage =
          formData.educationLevel.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 12:
        errorMessage =
          formData.majorOrAreaOfStudy.trim() !== ""
            ? ""
            : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 13:
        errorMessage =
          formData.notableAccomplishments.trim() !== ""
            ? ""
            : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 14:
        errorMessage =
          formData.requiredQualifications.trim() !== ""
            ? ""
            : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 15:
        errorMessage =
          formData.qualificationsMatch.trim() !== ""
            ? ""
            : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 16:
        errorMessage =
          formData.interestedforjob.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 18:
        errorMessage =
          formData.fullName.trim() !== "" ? "" : "Please fill this in";
        return { enabled: errorMessage === "", errorMessage };
      case 19:
        errorMessage =
          formData.email.trim() !== "" ? "" : "Please fill this in";
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
          <div className="question-1-header">
            <h2> Before we start, can we get your first name ? </h2>{" "}
            <input
              type="text"
              placeholder="Type your answer here"
              className="input-question-2"
              value={inputText}
              onChange={handleChange}
            />{" "}
            <div className="question-1-btn-main">
              <div className="question-1-btn">
                <button id="Button"
                  onClick={() => handleNext({ fullName: inputText })}
                  disabled={errorMessage !== ""}
                >
                  {" "}
                  Ok ✓{" "}
                </button>{" "}
              </div>{" "}
              <div className="question-1-data">
                press <strong> Enter↵ </strong>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 3:
        return (
          <div className="question-1-div2">
            <h2> Nice to meet you {inputText}.Here 's how CoverAI works: </h2>{" "}
            <p>
              <span>
                {" "}
                We will ask you a bunch of questions, and based on your answers
                craft the perfect cover letter.{" "}
              </span>{" "}
              <br />{" "}
              <span>
                {" "}
                We use Artificial Intelligence to make the letter unique and 100
                % customized to the position you are applying to.{" "}
              </span>{" "}
              <br />
              <span> All sounds good to you ? </span> <br />
            </p>{" "}
            <div className="question-1-div2-main">
              <div className="question-1-div2-btn">
                <button id="Button" onClick={() => handleNext()}> Sounds great </button>{" "}
              </div>{" "}
              <div className="render-in-div2-part">
                press <strong> Enter↵ </strong>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 4:
        return (
          <div className="question-1-div3">
            <h2> Glad to hear it. </h2>{" "}
            <span>
              The questions you will be asked have been crafted by recruitment
              experts to maximize cover letter relevance and its impact on
              recruiters.{" "}
            </span>{" "}
            <br />
            <p>
              <span>
                We know crafting cover letter has always been a pain.We promise
                you won 't have to do that ever again.{" "}
              </span>{" "}
              <br />
            </p>{" "}
            <div className="question-1-div2-main">
              <div className="question-1-div2-btn">
                <button id="Button" onClick={() => handleNext()}> Ok Fire Away </button>{" "}
              </div>{" "}
              <div className="render-in-div2-part">
                press <strong> Enter↵ </strong>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 5:
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
      case 6:
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
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />{" "}
              <div className="question-2-btn-main">
                <div className="question-2-btn ">
                  <button id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
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
      case 7:
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
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />{" "}
            
              <div className="question-2-btn-main">
                <div className="question-2-btn ">
                  <button id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-2-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 8:
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
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-2-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 9:
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keyachievments: e.target.value,
                  })
                }
              />{" "}
        
              <div className="question-3-btn-main">
                <div className="question-3-btn ">
                  <button id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-3-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 10:
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
      case 11:
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    educationLevel: e.target.value,
                  })
                }
              />{" "}
            
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    majorOrAreaOfStudy: e.target.value,
                  })
                }
              />{" "}
             
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notableAccomplishments: e.target.value,
                  })
                }
              />{" "}
            
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button  id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requiredQualifications: e.target.value,
                  })
                }
              />{" "}
             
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button  id="Button"
                    onClick={() => handleNext()}
                    enabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    qualificationsMatch: e.target.value,
                  })
                }
              />{" "}
            
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button  id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-5-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 16:
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interestedforjob: e.target.value,
                  })
                }
              />{" "}
            
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button  id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-5-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 17:
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    motivationStatement: e.target.value,
                  })
                }
              />{" "}
              <h5> Shift⇧ + Enter↵ to make a line break </h5>{" "}
             
              <div className="question-6-btn-main">
                <div className="question-5-btn">
                  <button  id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-6-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 18:
        return (
          <div className="question-6-main">
            <div className="question-1-header">
              <h2>
                {" "}
                And that 's it! Just a few personal details and we' ll have all
                the info we need.{" "}
              </h2>{" "}
              <h2> Can we get your full name ? </h2>{" "}
              <input
                type="text"
                placeholder="Type your answer here"
                className="input-question-5"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
              />{" "}
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button   id="Button"
                    onClick={() => handleNext()}
                    disabled={!isButtonEnabled()}
                  >
                    {" "}
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-5-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 19:
        return (
          <div className="question-7-main">
            <div className="question-1-header">
              <h2> And your email address tooThis question is required.* </h2>{" "}
              <p> This is how we 'll contact you.</p>{" "}
              <input
                type="text"
                placeholder="Type your answer here"
                className="input-question-5"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />{" "}
            
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button  id="Button"
                    onClick={() => handleNext()}
                    disabled={errorMessage !== ""}
                  >
                    {" "}
                    Ok{" "}
                  </button>{" "}
                </div>{" "}
                <div className="question-5-data">
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );

      case 20:
        return (
          <div className="question-final-main">
            {" "}
            <div className="question-5-div1">
              <h2> You made it!Are you ready to see your cover letter ? </h2>{" "}
              <p> Hope you like it. </p>{" "}
              <div className="question-5-btn-main">
                <div className="question-5-btn">
                  <button id="Button"
                  
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
                  press <strong> Enter↵ </strong>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );
      case 21:
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
                      <div>
                    <div className="cover-loader"></div>
                    <p> Your Cover Letter is generating in while</p>
                    </div>
                  )}
                    {/* Show the "Show Letter" button */}
                    {!showLoader && (
              <div className="button-text-center" id="coverLetterButton">
                <button id="Button" className="show-cover-letter-button" onClick={() => { handleShowLetterClick(); handleNext(); }}>
                  Show Letter
                </button>
                <p> Your Cover letter has been created </p>
              </div>
            )}
                  </div>
                </div>
              </div>  
            </div>
          </div>
        );
        case 22:
          const halfwayIndex = Math.floor(coverLetterText.length / 2);
          return (
            <div className="coverLetterWholeWrapper">
              {/* Display the cover letter text character by character */}
              {coverLetterText.slice(0, currentDisplayIndex).map((char, index) => (
                <React.Fragment key={index}>
                  {char}
                </React.Fragment>
              ))}
              {/* Show the button when halfway through the text */}
              {currentDisplayIndex >= halfwayIndex && (
                <div className="blur-background">
                  <div className="coverLetterdivwrapper-2">
                    <div id="coverLetterDiv">      
                    <button id="Button" className="stripe-button" onClick={stripefunction}>
                     Click to Proceed 
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
            <div className="loader"> </div>{" "}
          </div>
        )}{" "}
        {showContent && renderSteps()}{" "}
      </section>{" "}
    </div>
  );
};

export default Register;