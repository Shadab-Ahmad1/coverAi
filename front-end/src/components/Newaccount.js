import React from "react";
import "./Newaccount.css";
import icon11 from "../assets/icon11.svg";
import icon12 from "../assets/icon12.png";
import icon13 from "../assets/icon13.svg";
import icon14 from "../assets/icon14.svg";
import { Link } from "react-router-dom";

function Newaccount() {
  return (
    <>
      <section>
        <div className="regsiter-section1">
          <div className="container-register">
            <h1 className="newaccount-h1"> My Account </h1>{" "}
            <div className="container-2-Register">
              <div className="form-main">
                <div className="form">
                  <input className="bhai-te" type="text" placeholder="Email" />
                  <input
                    className="bhai-te"
                    type="password"
                    placeholder="password"
                  />
                  <input
                    className="bhai-te"
                    type="password"
                    placeholder="confirm password"
                  />
                  <div className="text">
                    <p className="newaccount-already">
                      {" "}
                      Already have an account{" "}
                      <Link to="../Register"> Click </Link>{" "}
                    </p>{" "}
                    <a href="#" className="button-register">
                      {" "}
                      Continue{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Newaccount;
