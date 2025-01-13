import React from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {

  const navigate = useNavigate();

  const navigateToWelcome = () =>{
    navigate('/login')
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Haventrace Logo" className="logo-image" />
          <span className="logo-text">Haventrace</span>
        </div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#admin">Admin</a>
          <a href="#public">Public</a>
        </nav>
      </header>

      <main className="main">
        <h1 className="title">Missing Person Identification System</h1>
        <p className="subtitle">For search, discover, or help locate a missing person:</p>

        <div className="card-container">
          <div className="card">
            <div className="icon">👨‍👨‍👧</div>
            <h3>Parent</h3>
            <p>Access cases and resources for parents with missing children.</p>
            <a href="#parent" className="link" onClick={navigateToWelcome}>Login</a>
          </div>

          <div className="card dark-card">
            <div className="icon">👮</div>
            <h3>Police</h3>
            <p>Search, track, and update cases in your jurisdiction.</p>
            <a href="#police" className="link" onClick={navigateToWelcome}>Login</a>
          </div>

          

          <div className="card dark-card">
            <div className="icon">🔍</div>
            <h3>Search</h3>
            <p>Search for missing people using advanced tools.</p>
            <a href="#search" className="link">Learn more</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;