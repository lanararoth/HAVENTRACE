import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import missingCases from '../assets/data/Data';
import '../styles/Police.css';

const Police = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem("missingCases")) || missingCases;
    setCases(storedCases);
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);  // Navigate to the details page with the case id
  };

  return (
    <div className="police-page">
      <h1>Missing Persons List</h1>
      <div className="case-list">
        <ul>
          {cases.length > 0 ? (
            cases.map((caseItem) => (
              <li key={caseItem.id} className="case-item">
                <div className="case-info">
                  {caseItem.imageSrc ? (
                    <img
                      src={caseItem.imageSrc}
                      alt={caseItem.name}
                      className="case-image"
                    />
                  ) : (
                    <div className="case-image no-image">No Image</div>
                  )}
                  <div className="case-text">
                    <p>{caseItem.name} (Age: {caseItem.age})</p>
                    <p>Last Seen: {caseItem.lastSeen}</p>
                  </div>
                </div>
                <div className="case-actions">
                  <button 
                    className="details-btn" 
                    onClick={() => handleViewDetails(caseItem.id)} // Trigger navigation
                  >
                    View Details
                  </button>
                  <div className="status-update">
                    <label>Status:</label>
                    <select>
                      <option>In Progress</option>
                      <option>Under Review</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No cases available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Police;
