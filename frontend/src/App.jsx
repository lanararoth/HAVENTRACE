import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import { useNavigate } from 'react-router-dom';


function App() {

  const navigate = useNavigate();

  const navigateToWelcome = () =>{
    navigate('/welcome')
  }
  return (
    <div className="app-container">
      <img src={logo} alt="Haventrace Logo" className="app-logo" onClick={navigateToWelcome} />
    </div>
  );
}

export default App;