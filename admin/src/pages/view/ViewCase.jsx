import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../../frontend/src/styles/MissingDetails.css"; // Use the same CSS

const API_URL = "http://127.0.0.1:8000/api/missingcases/get/";

const ViewCase = () => {
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
      console.log("Fetched Case Details:", data);
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
    <div className="missing-details-container view-case-container">
      <div className="missing-details-image">
        <img src={`http://127.0.0.1:8000${caseDetails.photo}`} alt={`Photo of ${caseDetails.name}`} />
      </div>
      <div className="missing-details-info">
        <h1>{caseDetails.name}</h1>
        <p><strong>Age:</strong> {caseDetails.age || "N/A"}</p>
        <p><strong>Gender:</strong> {caseDetails.gender || "N/A"}</p>
        <p><strong>Last Seen:</strong> {caseDetails.last_seen_location || "N/A"}</p>
        <p><strong>Special Features:</strong> {caseDetails.special_features || "N/A"}</p>
        <p><strong>Parent Name:</strong> {caseDetails.parent_name || "N/A"}</p>
        <p className="contact"><strong>Contact:</strong> {caseDetails.parent_phone_number || "N/A"}</p>
        <p><strong>Address:</strong> {caseDetails.address || "N/A"}</p>
      </div>
      <Link to="/missingcase" className="back-button">Back to Cases</Link>
    </div>
  );
};

export default ViewCase;
