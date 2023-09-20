import React from "react";
import "./Newaccount.css";
import "./Prices.css";
import { Link } from "react-router-dom";

function Prices() {
  return (
    <>
      <section>
        <div className="main-container">
          <div className="next-conatiner">
            <div className="container-price">
              <h1> Prices </h1>{" "}
              <p className="price-p1">
                {" "}
                Take advantage of our 24 - hour free trial offer to discover our
                service!{" "}
              </p>{" "}
              <div className="price">
                {" "}
                <p>
                  <span> 14.99€ </span> <p className="price-p4"> / month </p>{" "}
                </p>{" "}
              </div>{" "}
              <div className="ul-price">
                <ul className="prices-ul">
                  <li>
                    {" "}
                    <i className="fa fa-genderless"> </i>Non - binding subscription{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <i className="fa fa-genderless"> </i>Cancel at any time{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <i className="fa fa-genderless"> </i> Satisfied or refunded
                    within 14 days{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <i className="fa fa-genderless"> </i> Unlimited email
                    support{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div className="button-class">
                <button className="button-register"> Register Now </button>{" "}
              </div>{" "}
              <p className="price-p2">
                {" "}
                Already have an account ?
                <Link to="/Login"> Click here </Link>{" "}
              </p>{" "}
              <p className="price-p3">
                {" "}
                After 24 hours and without cancellation, our offer will
                automatically renew as a non - binding subscription, at a price
                of€ 14.99 per month.If your account is not in €, you will be
                debited at the exchange rate calculated by your bank on the day
                of the transaction.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Prices;
