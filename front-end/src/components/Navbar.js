// import React from "react";
// import logo from "../assets/logo.png";
// import "./Navbar.css";
// import Register from "./Register";
// import { Link } from "react-router-dom";
// import Prices from "../components/Prices";
// import FAQ from "../components/FAQ";
// import Unsubscribe from "../components/Unsubscribe";

// function Navbar() {
//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-logo">
//           <img src={logo} alt="Logo" className="logo" />
//         </div>{" "}
//         <div className="navbar-content">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               {" "}
//               <a href="/"> Home </a>{" "}
//             </li>{" "}
//             <li className="nav-item">
//               {" "}
//               <Link to="/Prices"> Prices </Link>{" "}
//             </li>{" "}
//             <li className="nav-item">
//               {" "}
//               <Link to="/FAQ"> FAQ </Link>{" "}
//             </li>{" "}
//             {/* <li className="nav-item"><a href="/services">Create letter</a></li> */}{" "}
//             <Link to="/Unsubscribe" className="unsubscribe-button">
//               {" "}
//               Unsubscribe{" "}
//             </Link>{" "}
//             <Link to="/Register" className="login-button">
//               {" "}
//               Log in{" "}
//             </Link>{" "}
//           </ul>{" "}
//         </div>{" "}
//       </nav>{" "}
//     </>
//   );
// }

// export default Navbar;
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";
import menuIcon from "../assets/menu-icon.png";
import "../assets/menu-icon.png";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
        <Link to="/">  <img src={logo} alt="Logo" className="logo" /></Link>
        </div>{" "}
        <div className="navbar-content">
          <ul className={`navbar-nav ${isMobileMenuOpen ? "open" : ""}`}>
            <li className="nav-item">
              <a href="/"> Home </a>{" "}
            </li>{" "}
            <li className="nav-item">
              <Link to="/Prices"> Prices </Link>{" "}
            </li>{" "}
            <li className="nav-item">
              <Link to="/FAQ"> FAQ </Link>{" "}
            </li>{" "}
            <li>
              {" "}
              <Link to="/Unsubscribe" className="unsubscribe-button">
                Unsubscribe{" "}
              </Link>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div className="navbar-buttons">
          <button
            className={`mobile-menu-button ${isMobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
          >
            <img src={menuIcon} alt="Menu" />
          </button>{" "}
          <Link to="/Login" className="login-button">
            Log in
          </Link>{" "}
        </div>{" "}
      </nav>{" "}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <a href="/"> Home </a>{" "}
            </li>{" "}
            <li>
              <Link to="/Prices"> Prices </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/FAQ"> FAQ </Link>{" "}
            </li>{" "}
          </ul>{" "}
        </div>
      )}{" "}
    </>
  );
}

export default Navbar;
