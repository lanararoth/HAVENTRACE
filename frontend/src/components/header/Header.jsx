import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>Haventrace</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/home" className="nav-link">Home</Link></li>
          <li><Link to="/admin" className="nav-link">Admin</Link></li>
          <li><Link to="/stations" className="nav-link">Police Stations</Link> </li>
          <li><Link to="/emergency" className="nav-link">Emergency Contact</Link></li>
          <li><Link to="/upload" className="nav-link">Upload Photo</Link></li>
          <li><Link to="/contactus" className="nav-link">ContactUs</Link></li>
        </ul>
      </nav>
      <div className="header-actions">
        
        <button className="btn login"><Link to="/login" className="nav-link">Login</Link></button>
        <button className="btn register"><Link to="/register" className="nav-link">Register</Link></button>
      </div>
    </header>
  );
};

export default Header;
