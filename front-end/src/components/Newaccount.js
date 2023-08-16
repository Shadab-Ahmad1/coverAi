import React, { useState } from "react";
import "./Newaccount.css";
import { Link} from "react-router-dom";


function Newaccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isEmailValid =
  email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const validateForm = () => {
  const newErrors = {};

  if (!password) {
    newErrors.password = ["This field is required"];
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters long";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleRegister = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setErrors({ ...errors, server: data.error });
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  
  return (
    <section>
      <div className="regsiter-section1">
        <div className="container-register-wrapper">
          <h1 className="newaccount-h1"> Register </h1>
          <div className="container-2-Register" id="container-2-Register">
            <div className="form-main">
              <div className="form">
                <div className="email-error">
              {errors.server && <p className="error">{errors.server}</p>}
                </div>
              <input
                  className="bhai-te"
                  type="text"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" });
                  }}
                />
               <div className="email-error">
                 {errors.email && <p className="error">{errors.email}</p>}
               </div>
                 <input
                  className="bhai-te"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                />
                <div className="email-error">
                 {errors.password && <p className="error">{errors.password}</p>}
                </div>
                 <input
                  className="bhai-te"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors({ ...errors, confirmPassword: "" });
                  }}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
                <div className="text">
                  <p className="newaccount-already">
                    Already have an account?{" "}
                    <Link to="../login"> Click here </Link>{" "}
                  </p>{" "}
                  <button  className={`button-register ${isEmailValid ? "" : "disabled-button"}`} onClick={handleRegister} disabled={!isEmailValid}>
                    Continue
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}

export default Newaccount;
