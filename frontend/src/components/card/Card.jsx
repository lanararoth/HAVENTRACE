import React from "react";
import "./Card.css"; // Ensure the styling matches the new structure
import { Link } from "react-router-dom";

const Card = ({ id, imageSrc, name, age, gender, contact, buttonText }) => {  return (
    <div className="card">
      <img src={imageSrc} alt={`Photo of ${name}`} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description"><strong>Age:</strong> {age}</p>
        <p className="card-description"><strong>Gender:</strong> {gender}</p>
        <p className="card-description"><strong>Contact:</strong> {contact}</p>

        {/* Add the Learn More button here */}
        <button className="card-button">
          <Link to={`/details/${id}`}>{buttonText}</Link>
        </button>
       </div>
    </div>
  );
};

export default Card;


