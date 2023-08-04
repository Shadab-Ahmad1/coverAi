import React from "react";
import "./Forget.css";

function Forget() {
  return (
    <>
      <section className="forget-main">
        <div className="forget-div1">
          <h1 className="forget-h1"> Forgot Your Password </h1>{" "}
          <div className="forget-div2">
            <p className="forget-p">
              Once you have entered your email, you will receive a confirmation
              link to reset your password{" "}
            </p>{" "}
            <input type="email" placeholder="Email" />
            <button className="forget-button"> Send Reset Link </button>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Forget;
