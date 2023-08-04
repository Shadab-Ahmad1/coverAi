import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Login.css";

function Login() {
  return (
    <>
      <section>
        <div className="Register-pic">
          <div className="container-bhai">
            <h1 className="Register-h1"> My Account </h1>{" "}
            <div className="Register-div">
              <div className="input">
                <input
                  type="text"
                  placeholder="Email"
                  className="input-email"
                  width={22}
                />{" "}
                <input
                  type="password"
                  placeholder="password"
                  className="input-email"
                  width={22}
                />{" "}
                <div className="forget">
                  <Link to="../Forget" className="forget">
                    {" "}
                    I forget my password{" "}
                  </Link>{" "}
                </div>{" "}
                <button className="connect"> Connect </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="Register-div2">
            <p className="Register-div2-p"> I don 't have an account yet </p>{" "}
            <Link to="../Newaccount" className="Register-endbutton">
              {" "}
              Register{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Login;
