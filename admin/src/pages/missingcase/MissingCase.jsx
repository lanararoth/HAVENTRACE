import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MissingCase.css";

const API_BASE = "http://127.0.0.1:8000/api/missingcases/";

const MissingCase = () => {
  const [missingCases, setMissingCases] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchCases = async () => {
    try {
      const response = await fetch(`${API_BASE}get/`);
      if (!response.ok) throw new Error("Failed to fetch cases");
      
      const data = await response.json();
      console.log("Fetched Cases:", data);
      setMissingCases(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCases();

    const handleStorageChange = () => {
      if (localStorage.getItem("newCaseAdded")) {
        fetchCases();
        localStorage.removeItem("newCaseAdded");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        const response = await fetch(`${API_BASE}delete/${id}/`, { method: "DELETE" });
        if (response.ok) {
          setMissingCases((prev) => prev.filter((caseItem) => caseItem.id !== id));
          setAlertMessage("Case deleted successfully!");
          setTimeout(() => setAlertMessage(""), 3000);
        } else {
          console.error("Failed to delete case");
        }
      } catch (error) {
        console.error("Error deleting case:", error);
      }
    }
  };

  const handleNotify = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/missingcases/notify/${id}/`, {
        method: "POST",
      });
  
      if (response.ok) {
        alert("Notification sent successfully!");
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Network error. Check console for details.");
    }
  };
  

  return (
    <div className="missing-cases-admin-container">
      <h1 className="page-title">Missing Cases - Admin Panel</h1>
      {alertMessage && <div className="alert-notification">{alertMessage}</div>}

      <table className="missing-cases-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Last Seen</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missingCases.length > 0 ? (
            missingCases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td>
                  <img src={`http://127.0.0.1:8000${caseItem.photo}`} alt={caseItem.name} className="case-image" />
                </td>
                <td>{caseItem.name}</td>
                <td>{caseItem.age}</td>
                <td>{caseItem.gender}</td>
                <td>{caseItem.last_seen_location}</td>
                <td>{caseItem.parent_phone_number}</td>
                <td>
                  <Link to={`/missingcase/view/${caseItem.id}`} className="action-button view-button">View</Link>
                  <Link to={`/missingcase/edit/${caseItem.id}`} className="action-button edit-button">Edit</Link>
                  <button className="action-button delete-button" onClick={() => handleDelete(caseItem.id)}>Delete</button>
                  <button className="action-button notify-button" onClick={() => handleNotify(caseItem.id)}>Notify</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7">No cases found.</td></tr>
          )}
        </tbody>
      </table>

      <Link to="/missingcase/add" className="addcase-button">+ Add New Case</Link>
    </div>
  );
};

export default MissingCase;
