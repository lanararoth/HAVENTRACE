import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import { useNavigate } from 'react-router-dom';
function App() {

  const navigate = useNavigate();

  const navigateToHomePage = () =>{
    navigate('/home')
  }
  return ( 
    <div className="app-container">
      <img src={logo} alt="Haventrace Logo" className="app-logo" onClick={navigateToHomePage}/>
    </div>
  );
}



export default App;
