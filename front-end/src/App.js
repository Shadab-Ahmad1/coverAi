import React, { useEffect, useState } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
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
import Dashboard from "./components/client/dashboard";
import ViewLetter from "./components/client/view-letter";
function App() {
  
  const [formData, setFormData] = useState("");
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("/Register");
  const isThankYou = location.pathname.includes("/thank-you");
  const isDashboard =location.pathname.includes("/client/dashboard");
  const isViewLetter =location.pathname.includes("/client/view-letter");
  

const useAuth = () => {
  // Simulated user object for example
  const user = "exampleuser";
  const logout = () => {
    // Simulated logout logic
  };

  return { user, logout };
};

function PrivateRoute({ element: Element, ...rest }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Element {...rest} />;
}
 

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
      {!isRegisterPage && !isThankYou && !isDashboard  && !isViewLetter && <Navbar />}{" "}
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
        <Route
        path="/client/dashboard"
        element={<PrivateRoute element={<Dashboard />} />} 
        />
        <Route
        path="/client/view-letter"
        element={<PrivateRoute element={<ViewLetter />} />}
        />
        <Route path="/client/dashboard" element={<Dashboard/>}/>
        <Route path="/client/view-letter" element={<ViewLetter/>}/>
       </Routes>{" "}
      {!isRegisterPage && !isThankYou && !isDashboard && !isViewLetter && <Footer />}{" "}
    </>
  );
}
export default App;
