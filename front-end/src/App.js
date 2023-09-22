import React, { useEffect, useState } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateLetter from "./components/create-letter";
import Newaccount from "./components/Newaccount";
import Login from "./components/Login";
import Prices from "./components/Prices";
import FAQ from "./components/FAQ";
import Unsubscribe from "./components/Unsubscribe";
import Forget from "./components/Forget";
import Footer from "./components/Footer";
import Termcond from "./components/Termcond";
import Privacy from "./components/Privacy";
import Cookies from "./components/Cookies";
import Thankyou from "./components/thankyou";
import NewLetter from "./components/client/new-letter";
import Dashboard from "./components/client/dashboard";
import Letter from "./components/client/letter";
import NewLetterThankYou from "./components/client/typeform-thank-you";
import ResetPassword from "./components/Resetpassword";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import Unroute from "./Unroute";

function App() {

  const location = useLocation();
  const isThankYou = location.pathname.includes("/thank-you");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isThankYou) {
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("paymentId");
      if (!paymentId) {

        navigate("/Register");
      }  
    }
  }, [location, isThankYou, navigate]);

  const showNavbarAndFooter =
    location.pathname === "/" ||
    location.pathname === "/Newaccount" ||
    location.pathname === "/Login" ||
    location.pathname === "/Prices" ||
    location.pathname === "/FAQ" ||
    location.pathname === "/Unsubscribe" ||
    location.pathname === "/Termcond" ||
    location.pathname === "/Privacy" ||
    location.pathname === "/Cookies" ||
    location.pathname === "/Forget";
  return (
    <>
       {showNavbarAndFooter && <Navbar />}
      <Routes>
      {isAuthenticated() && (
          <>
            <Route path="/client/dashboard" element={<Dashboard />} />
            <Route path="/client/new-letter" element={<NewLetter />} />
            <Route path="/client/letter" element={<Letter/>}/>
          
          </>
        )}
        <Route path="/" element={<Home />} />{" "}
        <Route path="/create-letter" element={<CreateLetter />} />{" "}
        <Route path="/Newaccount" element={<Newaccount />} />{" "}
        <Route path="/Login" element={<Login />} />{" "}
        <Route path="/Prices" element={<Prices />} />{" "}
        <Route path="/FAQ" element={<FAQ />} />{" "}
        <Route path="/Unsubscribe" element={<Unsubscribe />} />{" "}
        <Route path="/Termcond" element={<Termcond />} />{" "}
        <Route path="/Privacy" element={<Privacy />} />{" "}
        <Route path="/Cookies" element={<Cookies />} />{" "}
        <Route path="/Forget" element={<Forget />} />{" "}
        <Route path="/thank-you"  element={<Thankyou />} />{" "}
        <Route path="/client/typeform-thank-you" element={< NewLetterThankYou/>}/>
        <Route path="reset/:token" element={< ResetPassword/>} />
        <Route path="/*" element={<Unroute />}  />
      </Routes>{" "}
      {showNavbarAndFooter && <Footer />}
    </>
  );
}
export default App;

