import React from "react";
import "./Home.css";
import "../assets/logo.png";
import icon11 from "../assets/icon11.svg";
import icon12 from "../assets/icon12.png";
import icon13 from "../assets/icon13.svg";
import icon14 from "../assets/icon14.svg";
import Register from "./create-letter";
import Prices from "./Prices";
import Unsubscribe from "./Unsubscribe";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";


function Footer() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <section className="footer">
        <div className="footer">
          <div className="container-footer">
            <div className="row-3">
              <div className="footer-1">
                <div className="footer-logo">
                  <img
                    width={100}
                    src="https://coverai.pro/images/logo-1-white.png"
                  />
                </div>{" "}
                <div className="footer-data">
                  <p className="p1"> Eventos Singulares Kogarashi S.L. </p>{" "}
                  <p className="p1"> VAT - ESB16950552 </p>{" "}
                  <p className="p1"> Ronda Sant Pau 47 </p>{" "}
                  <p className="p1"> 08015 Barcelona, España </p>{" "}
                  <p className="p1">
                    {" "}
                    Contact us via{" "}
                    <a
                      href="mailto:info+coverai@yeesshh.com"
                      className="footer-a"
                    >
                      {" "}
                      email{" "}
                    </a>{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="footer-2">
              {isAuthenticated() ? (
                  <>
                    <ul>
                      <Link to="/" className="footer2-a">
                        Register
                      </Link>
                    </ul>
                    <ul>
                      <Link to="/" className="footer2-a">
                        Login
                      </Link>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <Link to="./Newaccount" className="footer2-a">
                        Register
                      </Link>
                    </ul>
                    <ul>
                      <Link to="../Login" className="footer2-a">
                        Login
                      </Link>
                    </ul>
                  </>
                )}
                <ul>
                  <Link to="../Unsubscribe" className="footer2-a">
                    {" "}
                    Unsubscribe{" "}
                  </Link>{" "}
                </ul>{" "}
                <ul>
                  <Link to="../Prices" className="footer2-a">
                    {" "}
                    Prices{" "}
                  </Link>{" "}
                </ul>{" "}
              </div>{" "}
              <div className="footer-3">
                <ul>
                  <Link to="../FAQ" className="footer3-a">
                    {" "}
                    FAQ{" "}
                  </Link>{" "}
                </ul>{" "}
                <ul>
                  <Link to="../Termcond" className="footer3-a">
                    {" "}
                    Terms and Conditions{" "}
                  </Link>{" "}
                </ul>{" "}
                <ul>
                  <Link to="../Termcond" className="footer3-a">
                    {" "}
                    Privacy policy{" "}
                  </Link>{" "}
                </ul>{" "}
                <ul>
                  <Link to="../Cookies" className="footer3-a">
                    {" "}
                    Cookies{" "}
                  </Link>{" "}
                </ul>{" "}
              </div>{" "}
              <div className="footer-4">
                <div className="footer-4-payment">
                  <h2 className="h2-footer-4-payment">
                    {" "}
                    Any payment card accepted{" "}
                  </h2>{" "}
                  <div className="footer-payment-img">
                    <ul>
                      <div className="payment-img">
                        <a>
                          <Link to="/">
                          <img src={icon11} alt="error" />
                          </Link>
                        </a>{" "}
                      </div>{" "}
                      <div className="payment-img">
                        <a>
                        <Link to="/">
                          <img src={icon12} alt="error" />
                          </Link>
                        </a>{" "}
                      </div>{" "}
                      <div className="payment-img">
                        <a>
                         <Link to="/">
                          <img width={100} src={icon13} alt="error" />
                          </Link>
                        </a>{" "}
                      </div>{" "}
                      <div className="payment-img">
                        <a>
                         <Link to="/">
                          <img src={icon14} alt="error" />
                          </Link>
                        </a>{" "}
                      </div>{" "}
                    </ul>{" "}
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

export default Footer;
