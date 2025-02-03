import React, { useState } from "react";
import "../styles/Parent.css";
import MissingCases from "./MissingCases";
import EmergencyNumbers from "./EmergencyNumbers";

const Parent = () => {
  const [photo, setPhoto] = useState(null);
  const [activeSection, setActiveSection] = useState("myDetails");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const myDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    caseStatus: "Under Review",
    policeOfficer: "Officer Jane Smith",
    childName: "Jane Doe",
    childAge: "10",
    childLastSeen: "Park Avenue",
  };

  const emergencyNumbers = [
    { label: "Police", number: "100" },
    { label: "Fire Brigade", number: "101" },
    { label: "Ambulance", number: "102" },
  ];

  const sectionNames = {
    myDetails: "My Details",
    missingPersons: "Missing Cases",
    emergencyNumbers: "Emergency Numbers",
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="parent-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">{isSidebarOpen ? "Parent Dashboard" : ""}</h1>
          <button
            className="toggle-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>
        <ul className="menu">
          <li
            className={activeSection === "myDetails" ? "active" : ""}
            onClick={() => setActiveSection("myDetails")}
          >
            {isSidebarOpen ? sectionNames.myDetails : "Details"}
          </li>
          <li
            className={activeSection === "missingPersons" ? "active" : ""}
            onClick={() => setActiveSection("missingPersons")}
          >
            {isSidebarOpen ? sectionNames.missingPersons : "Cases"}
          </li>
          <li
            className={activeSection === "emergencyNumbers" ? "active" : ""}
            onClick={() => setActiveSection("emergencyNumbers")}
          >
            {isSidebarOpen ? sectionNames.emergencyNumbers : "Emergency"}
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="content">
        <div className="content-header">
          <h2>{sectionNames[activeSection]}</h2>
        </div>

        {activeSection === "myDetails" && (
          <section className="standard-page">
            <div className="details-container">
              {/* Left Section - Photo and Buttons */}
              <div className="photo-section">
                <label htmlFor="photo-upload" className="photo-label" >
                    
                </label>
                
            
                <input
                  type="file"
                  id="photo-upload"
                  className="photo-input"
                  onChange={handlePhotoChange}
                  accept="image/*"
                />
                {photo && (
                  <div className="photo-preview">
                    <img src={photo} alt="Profile" className="profile-photo" />
                    <button className="delete-photo" onClick={handleDeletePhoto}>
                      Delete Photo
                    </button>
                  </div>
                )}
              </div>

              {/* Right Section - Parent and Child Details */}
              <div className="info-section">
                <h3>Parent Details</h3>
                <ul>
                  <li><strong>Name:</strong> {myDetails.name}</li>
                  <li><strong>Email:</strong> {myDetails.email}</li>
                  <li><strong>Phone:</strong> {myDetails.phone}</li>
                  <li><strong>Case Status:</strong> {myDetails.caseStatus}</li>
                  <li><strong>Police Officer:</strong> {myDetails.policeOfficer}</li>
                </ul>

                <h3>Child Details</h3>
                <ul>
                  <li><strong>Name:</strong> {myDetails.childName}</li>
                  <li><strong>Age:</strong> {myDetails.childAge}</li>
                  <li><strong>Last Seen:</strong> {myDetails.childLastSeen}</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === "missingPersons" && (
          <section className="standard-page">
            <MissingCases />
          </section>
        )}

        {activeSection === "emergencyNumbers" && (
          <section className="standard-page">
            <EmergencyNumbers />
          </section>
        )}
      </main>
    </div>
  );
};

export default Parent;