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
import Viewletter from "./components/Viewletter";
import Thankyou from "./components/thankyou";
import NewLetter from "./components/client/new-letter";
import Dashboard from "./components/client/dashboard";
import NewLetterThankYou from "./components/client/typeform-thank-you";


function App() {
  
  const [formData, setFormData] = useState("");
  const location = useLocation();
  const isCreateLetter = location.pathname.includes("/create-letter");
  const isThankYou = location.pathname.includes("/thank-you");
  const isDashboard =location.pathname.includes("/client/dashboard");
  const isNewLetter =location.pathname.includes("/client/new-letter");
  

 
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

  return (
    <>
      {" "}
      {!isCreateLetter && !isThankYou && !isDashboard  && !isNewLetter && <Navbar />}{" "}
      <Routes>
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
        <Route path="/Viewletter" element={<Viewletter />} />{" "}
        <Route path="/thank-you"  element={<Thankyou />} />{" "}
        <Route path="/client/dashboard" element={<Dashboard/>}/>
        <Route path="/client/new-letter" element={<NewLetter/>}/>
        <Route path="/client/typeform-thank-you" element={< NewLetterThankYou/>}/>
        
      </Routes>{" "}
      {!isCreateLetter && !isThankYou && !isDashboard && !isNewLetter && <Footer />}{" "}
    </>
  );
}
export default App;

