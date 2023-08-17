import React, { useState } from "react";
import { Link, } from "react-router-dom";
import "./Home.css";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("authToken", token);

        window.location.href = "/client/dashboard";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <>
      <section>
        <div className="Register-pic">
          <div className="login-container">
            <h1 className="Register-h1"> My Account </h1>{" "}
           <div className="login-form-wrapper">
           <div className="Register-div">
              <div className="input">
                <input
                  type="text"
                  placeholder="Email address"
                  className="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  width={22}
                />{" "}
                <input
                  type="password"
                  placeholder="password"
                  className="input-email"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  width={22}
                />{" "}
                <div className="forget">
                  <Link to="../Forget" className="forget">
                    {" "}
                    I forget my password{" "}
                  </Link>{" "}
                </div>{" "}
                <button onClick={handleLogin} className="connect"> Connect </button>{" "}
              </div>{" "}
            </div>{" "}
            <div className="Register-div2">
            <p className="Register-div2-p"> I don 't have an account yet </p>{" "}
            <Link to="../Newaccount" className="Register-endbutton">
              {" "}
              Register{" "}
            </Link>{" "}
          </div>{" "}
           </div>
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Login;
