import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from '../assets/logo.png';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/haventrace/src/assets/logo.png" alt="Haventrace Logo" />
        <span className="title">HAVENTRACE</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
