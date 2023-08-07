import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
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

function App() {

  const [formData, setFormData] = useState("");
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("/Register");
  const isThankYou = location.pathname.includes("/thank-you");
  const isViewletter = location.pathname.includes("/Viewletter");

  return (
    <>
      {" "}
      {!isRegisterPage && !isThankYou && <Navbar />}{" "}
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/Register" element={<Register />} />{" "}
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
      </Routes>{" "}
      {!isRegisterPage && !isThankYou && <Footer />}{" "}
    </>
  );
}

export default App;
