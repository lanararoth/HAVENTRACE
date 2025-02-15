import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/MissingDetails.css";

const API_URL = "http://127.0.0.1:8000/api/missingcases/get/";

const MissingDetails = () => {
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  const fetchCaseDetails = async () => {
    try {
      const response = await fetch(`${API_URL}${id}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch case details");
      }
      const data = await response.json();
      console.log("Fetched Case Details:", data); // Debugging
      setCaseDetails(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching case details:", error);
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!caseDetails) return <h2>Case not found!</h2>;

  return (
    <div className="missing-details-container">
      <div className="missing-details-image">
        <img src={`http://127.0.0.1:8000${caseDetails.photo}`} alt={`Photo of ${caseDetails.name}`} />
      </div>
      <div className="missing-details-info">
        <h1>{caseDetails.name}</h1>
        <p><strong>Age:</strong> {caseDetails.age}</p>
        <p><strong>Gender:</strong> {caseDetails.gender}</p>
        <p><strong>Last Seen:</strong> {caseDetails.last_seen_location}</p>
        <p><strong>Special Features:</strong> {caseDetails.special_features}</p>
        <p><strong>Parent Name:</strong> {caseDetails.parent_name}</p>
        <p className="contact"><strong>Contact:</strong> {caseDetails.parent_phone_number}</p>
        <p><strong>Address:</strong> {caseDetails.address}</p>
      </div>
    </div>
  );
};

export default MissingDetails;
