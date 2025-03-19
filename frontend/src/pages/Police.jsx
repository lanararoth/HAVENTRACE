import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Police.css";

const API_BASE_URL = "http://127.0.0.1:8000/api/missingcases";

const Police = () => {
  const [missingCases, setMissingCases] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCase, setNewCase] = useState({
    name: "",
    age: "",
    gender: "",
    last_seen_location: "",
    special_features: "",
    parent_name: "",
    address: "",
    parent_phone_number: "",
    missing_date: "",
    photo: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/get/`)
      .then((res) => res.json())
      .then((data) => setMissingCases(data))
      .catch((err) => console.error("Error fetching cases:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase((prevCase) => ({ ...prevCase, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewCase((prevCase) => ({
      ...prevCase,
      photo: e.target.files[0],
    }));
  };

  const handleSaveCase = async () => {
    console.log("Form Data:", newCase);
    if (!newCase.name || !newCase.age || !newCase.last_seen_location  || !newCase.photo) {
      alert("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    Object.keys(newCase).forEach((key) => {
      formData.append(key, newCase[key]);
    });

    if (editingIndex !== null) {
      const caseId = missingCases[editingIndex].id;
      await fetch(`${API_BASE_URL}/update/${caseId}/`, {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch(`${API_BASE_URL}/add/`, {
        method: "POST",
        body: formData,
      });
    }

    setIsAdding(false);
    setEditingIndex(null);
    setNewCase({
      name: "",
      age: "",
      gender: "",
      last_seen_location: "",
      special_features: "",
      parent_name: "",
      address: "",
      parent_phone_number: "",
      missing_date: "",
      photo: null,
    });

    fetch(`${API_BASE_URL}/get/`)
      .then((res) => res.json())
      .then((data) => setMissingCases(data));
  };

  const handleEditCase = (index) => {
    const caseToEdit = missingCases[index];
    setNewCase({
      name: caseToEdit.name,
      age: caseToEdit.age,
      gender: caseToEdit.gender,
      last_seen_location: caseToEdit.last_seen_location,
      special_features: caseToEdit.special_features,
      parent_name: caseToEdit.parent_name,
      address: caseToEdit.address,
      parent_phone_number: caseToEdit.parent_phone_number,
      missing_date: caseToEdit.missing_date,
      photo: null,
    });
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDeleteCase = async () => {
    if (editingIndex === null) return;
    const caseId = missingCases[editingIndex].id;

    await fetch(`${API_BASE_URL}/delete/${caseId}/`, { method: "DELETE" });

    setIsAdding(false);
    setEditingIndex(null);

    fetch(`${API_BASE_URL}/get/`)
      .then((res) => res.json())
      .then((data) => setMissingCases(data));
  };

  const handleLogout = () => {
    try {
      // Remove token from localStorage
      localStorage.removeItem("accessToken");
  
      // Optionally, clear any other authentication-related data
      sessionStorage.clear();  // If using sessionStorage
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // If using cookies
  
      // Redirect user to login page
      window.location.href = "/login";
  
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <div className="police-page">
      <div className="header">
        <h1>Missing Persons List</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="case-list">
        <button className="add-case-btn" onClick={() => setIsAdding(true)}>
          Add New Case
        </button>
        {isAdding && (
          <div className="case-form">
            <h2>{editingIndex !== null ? "Edit Case" : "Add New Case"}</h2>
            <input type="text" name="name" placeholder="Name" value={newCase.name} onChange={handleInputChange} />
            <input type="number" name="age" placeholder="Age" value={newCase.age} onChange={handleInputChange} />
            <select name="gender" value={newCase.gender} onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" name="last_seen_location" placeholder="Last Seen" value={newCase.last_seen_location} onChange={handleInputChange} />
            <input type="text" name="special_features" placeholder="Special Features" value={newCase.special_features} onChange={handleInputChange} />
            <input type="text" name="parent_name" placeholder="Parent Name" value={newCase.parent_name} onChange={handleInputChange} />
            <input type="text" name="address" placeholder="Address" value={newCase.address} onChange={handleInputChange} />
            <input type="text" name="parent_phone_number" placeholder="Parent Phone Number" value={newCase.parent_phone_number} onChange={handleInputChange} />
            <input type="date" name="missing_date" value={newCase.missing_date} onChange={handleInputChange} />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="form-actions">
              <button className="save-btn" onClick={handleSaveCase}>Save</button>
              <button className="cancel-btn" onClick={() => setIsAdding(false)}>Cancel</button>
              {editingIndex !== null && <button className="delete-btn" onClick={handleDeleteCase}>Delete</button>}
            </div>
          </div>
        )}
        {missingCases.length > 0 ? (
          <ul>
            {missingCases.map((caseData, index) => (
              <li key={caseData.id} className="case-item">
                <div className="case-info">
                  <img src={`http://127.0.0.1:8000${caseData.photo}`} alt={caseData.name} className="case-image" />
                  <div className="case-text">
                    <strong>{caseData.name}</strong> (Age: {caseData.age})<br />
                    Last Seen: {caseData.last_seen_location}
                  </div>
                </div>
                <div className="case-actions">
                  <button className="edit-btn" onClick={() => handleEditCase(index)}>Edit</button>
                  <button className="view-btn" onClick={() => navigate(`/details/${caseData.id}`)}>View</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-cases">No missing cases reported yet.</p>
        )}
      </div>
    </div>
  );
};

export default Police;
