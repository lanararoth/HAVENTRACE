import React from "react";
import { useParams } from "react-router-dom";
import "../styles/MissingDetails.css";
import missingCases from "../assets/data/Data"; // Assuming you have access to the data here

const MissingDetails = () => {
  const { id } = useParams();
  const caseDetails = missingCases.find((item) => item.id === parseInt(id));

  if (!caseDetails) {
    return <h2>Case not found!</h2>;
  }

  return (
    <div className="missing-details-container">
      <div className="missing-details-image">
        <img src={caseDetails.imageSrc} alt={`Photo of ${caseDetails.name}`} />
      </div>
      <div className="missing-details-info">
        <h1>{caseDetails.name}</h1>
        <p><strong>Age:</strong> {caseDetails.age}</p>
        <p><strong>Gender:</strong> {caseDetails.gender}</p>
        <p><strong>Last Seen:</strong> {caseDetails.lastSeen}</p>
        <p><strong>Special Features:</strong> {caseDetails.specialFeatures}</p>
        <p><strong>Parent Name:</strong> {caseDetails.parentDetails.parentName}</p>
        <p  className="contact"><strong>Contact:</strong> {caseDetails.parentDetails.contact}</p>
        <p><strong>Email:</strong> {caseDetails.parentDetails.email}</p>
        <p><strong>Address:</strong> {caseDetails.parentDetails.address}</p>
      </div>
    </div>
  );
};

export default MissingDetails;

