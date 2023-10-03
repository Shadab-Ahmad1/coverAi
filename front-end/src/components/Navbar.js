import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.png";
import "./Navbar.css";
import menuIcon from "../assets/menu-icon.png";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
        <div className="navbar-logo">
          <Link to="/">  <img src={logo} alt="Logo" className="logo" /></Link>
        </div>{" "}
        <div className={`navbar-content ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="navbar-nav">
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
          {isAuthenticated() ? (
            <Link to="/client/dashboard" className="login-button">
              Dashboard
            </Link>
          ) : (
            <Link to="/Login" className="login-button">
              Log in
            </Link>
          )}
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
