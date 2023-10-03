import React from "react";
import Homepng from "../assets/homepage.png";
import icon7 from "../assets/icon7.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";
import icon5 from "../assets/icon5.svg";
import icon6 from "../assets/icon6.svg";
import icon8 from "../assets/icon8.svg";
import icon9 from "../assets/icon9.svg";
import icon10 from "../assets/icon10.svg";
import "./Home.css";
import "../assets/logo.png";
import { useAuth } from '../AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();
  const generateButtonOnClick = () => {
    // If authenticated and in dashboard, redirect to the new cover letter page
    if (isAuthenticated()) {
      window.location.href = '/client/new-letter';
    } else {
      window.location.href = '/create-letter';
    }
  };
  return (
    <>
      <section className="home">
        <div className="home-1">
          <div className="home-left">
            <div className="home-left1">
              <div className="home-left2">
                <h1 className="h1"> Your Unique Cover letter </h1>{" "}
              </div>{" "}
             <button className="home-left1-button" onClick={generateButtonOnClick }>  Generate now</button>
            </div>{" "}
          </div>{" "}
          <div className="home-right">
            <img
              className="home-right-img"
              src={Homepng}
              alt="Error"
              width={300}
              height={400}
            />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="home-2">
        <div className="container">
          <h1>
            {" "}
            AI generates unique, impactful cover letters.Get noticed by
            recruiters!{" "}
          </h1>{" "}
          <div className="Row">
            <div className="row-1">
              <div className="img-1">
                <img src={icon7} alt="error" />
              </div>{" "}
              <h2 className="h2-row"> Create your account </h2>{" "}
              <p className="p-row">
                {" "}
                When registering, we will ask for your email address as well as
                creating a first cover letter.Your password will then be sent to
                you by email.{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-1">
              <div className="img-1">
                <img src={icon2} alt="error" />
              </div>{" "}
              <h2 className="h2-row"> Impress Employers with AI </h2>{" "}
              <p className="p-row">
                {" "}
                Try our service for free for the first 24 hours.Then you will be
                able to create unlimited cover letters with a subscription of€
                14.99 per month, with no fixed term.You can unsubscribe at any
                time.{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-1">
              <div className="img-1">
                <img src={icon3} alt="error" />
              </div>{" "}
              <h2 className="h2-row"> Generate cover letter in seconds </h2>{" "}
              <p className="p-row">
                {" "}
                Answer a set of questions and AI will generate your dream job
                cover letter.{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-1">
              <div className="img-1">
                <img src={icon4} alt="error" />
              </div>{" "}
              <h2 className="h2-row"> Job Applications Made Easy </h2>{" "}
              <p className="p-row">
                {" "}
                The letter is tailor made for you, matching your unique profile
                to the requirements of the company you are applying to.{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-1">
              <div className="img-1">
                <img src={icon5} alt="error" />
              </div>{" "}
              <h2 className="h2-row"> Unlimited downloads </h2>{" "}
              <p className="p-row">
                {" "}
                Copy your cover letter and paste it wherever you want: .doc, web
                applications, social network…{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-1">
              <div className="img-1">
                <img src={icon6} alt="error" />
              </div>{" "}
              <h2 className="h2-row"> Unlimited cover letters </h2>{" "}
              <p className="p-row">
                {" "}
                You can generate as many cover letters as you want, tailor your
                letter to each company or job you apply for.{" "}
              </p>{" "}
            </div>{" "}
            <div> </div> <div></div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="home-3">
        <div className="container-1">
          <h1> Boosts Your Applications with CoverAI </h1>{" "}
          <div className="Row">
            <div className="row-2">
              <div className="img-2">
                <img src={icon8} alt="error" />
              </div>{" "}
              <h2 className="h2-row2"> Subscription offer </h2>{" "}
              <p className="p-row2">
                {" "}
                Our service works with a monthly subscription at 14, 99€ with no
                time commitment.You have the option to terminate your
                subscription whenever you wish.Directly from our site in your
                member area, or by contacting us by email or phone.{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-2">
              <div className="img-2">
                <img src={icon9} alt="error" />
              </div>{" "}
              <h2 className="h2-row2"> Secure payment </h2>{" "}
              <p className="p-row2">
                {" "}
                All transactions made on our site are secured by one of the
                leaders in online payment.All your personal information is
                encrypted using SSL protocol.{" "}
              </p>{" "}
            </div>{" "}
            <div className="row-2">
              <div className="img-2">
                <img src={icon10} alt="error" />
              </div>{" "}
              <h2 className="h2-row2"> Invoices and receipts </h2>{" "}
              <p className="p-row2">
                {" "}
                If you need an invoice, please send us an email to Coverai.pro
                @silverlines.info and our finance department will send you the
                invoice directly by email.{" "}
              </p>{" "}
            </div>{" "}
            <div> </div> <div></div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="home-4">
        <div className="container-home4">
          <div className="container-2-home4">
            <div className="home4-data">
              <h2> To contact us </h2>{" "}
              <p className="p-home4">
                {" "}
                By email:
                <a href="mailto:info+coverai@yeesshh.com" className="home4-a">
                  {" "}
                  info + coverai @yeesshh.com{" "}
                </a>{" "}
              </p>{" "}
            </div>{" "}
            <div className="home4-button">
              <a
                href="mailto:info+coverai@yeesshh.com"
                className="button-home4"
              >
                {" "}
                Send message{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Home;
