import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Parent.css";

const Parent = () => {
  const [photo, setPhoto] = useState(null);
  const [myDetails, setMyDetails] = useState({
    ChildName: "",
    Age: "",
    Gender: "",
    MissingDate: "",
    LastSeenLocation: "",
    SpecialFeatures: "",
    ParentName: "",
    Address: "",
    ContactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleDeletePhoto = () => setPhoto(null);

  const handleLogout = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    const { ChildName, Age, Gender, MissingDate, LastSeenLocation, ParentName, ContactNumber } = myDetails;

    if (!ChildName.trim()) newErrors.ChildName = "Child's Name is required";
    if (!Age.trim()) newErrors.Age = "Age is required";
    else if (isNaN(Age)) newErrors.Age = "Age must be a number";
    if (!Gender.trim()) newErrors.Gender = "Gender is required";
    if (!MissingDate.trim()) newErrors.MissingDate = "Missing Date is required";
    if (!LastSeenLocation.trim()) newErrors.LastSeenLocation = "Last Seen Location is required";
    if (!ParentName.trim()) newErrors.ParentName = "Parent's Name is required";
    if (!ContactNumber.trim()) newErrors.ContactNumber = "Contact Number is required";
    else if (!/^\d{10}$/.test(ContactNumber)) newErrors.ContactNumber = "Contact Number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Details saved successfully!");
      setIsEditing(false); // Exit edit mode after saving
    }
  };

  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="parent-dashboard">
      {/* Content */}
      <main className="content">
        <div className="content-header">
          <h2>My Details</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <section className="standard-page">
          <form onSubmit={handleSubmit} className="details-container">
            {/* Left Side: Photo Upload Section */}
            <div className="photo-section">
              <div className="photo-upload-container">
                <label htmlFor="photo-upload" className="photo-upload-label">
                  {photo ? (
                    <div className="photo-preview">
                      <img src={photo} alt="Profile" className="profile-photo" />
                    </div>
                  ) : (
                    <div className="upload-placeholder">Click to Upload Photo</div>
                  )}
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  className="photo-input"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  disabled={!isEditing} // Disable photo upload when not in edit mode
                />
                {photo && (
                  <button className="delete-photo" onClick={handleDeletePhoto} type="button">
                    Delete Photo
                  </button>
                )}
              </div>
            </div>

            {/* Right Side: Form Fields */}
            <div className="info-section">
              <div className="details-card">
                <h3>Parent & Child Details</h3>
                <ul>
                  {Object.keys(myDetails).map((key) => (
                    <li key={key}>
                      <strong>{formatLabel(key)}:</strong>
                      <input
                        type="text"
                        name={key}
                        value={myDetails[key]}
                        onChange={handleInputChange}
                        className={errors[key] ? "error-input" : ""}
                        placeholder={`Enter ${formatLabel(key)}`}
                        disabled={!isEditing} // Disable input fields when not in edit mode
                      />
                      {errors[key] && <span className="error-text">{errors[key]}</span>}
                    </li>
                  ))}
                </ul>
                <div className="button-group">
                  {isEditing ? (
                    <button type="submit" className="save-button">
                      Save Details
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => setIsEditing(true)} // Enable edit mode
                    >
                      Edit Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Parent;