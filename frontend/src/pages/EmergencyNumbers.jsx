import React from "react";
import emergencyNumbers from "../assets/data/Emergency";
import "../styles/EmergencyNumbers.css";

const EmergencyNumbers = () => {
  return (
    <div className="emergency-numbers-container">
      <h1 className="title">Emergency Contacts</h1>
      <div className="cardscontainer">
        {emergencyNumbers.map((item) => (
          <div key={item.id} className="cards">
            <div className="icon">{item.icon}</div>
            <h2 className="service">{item.service}</h2>
            <a href={`tel:${item.number}`} className="number">
              {item.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyNumbers;
