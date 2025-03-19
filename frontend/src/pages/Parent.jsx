import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Parent.css";

const Parent = () => {
  const [photo, setPhoto] = useState(null);
  const [myDetails, setMyDetails] = useState({
    name: "",
    age: "",
    gender: "",
    missing_date: "",
    last_seen_location: "",
    special_features: "",
    parent_name: "",
    address: "",
    parent_phone_number: "",
  });

  const [savedDetails, setSavedDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [missingCaseId, setMissingCaseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("savedDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSavedDetails(parsedData);
      setMyDetails(parsedData);
      setPhoto(parsedData.photo);
      setIsEditing(false);
    }
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          photo: "Please upload a valid image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          photo: "File size must be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Save as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (e) => {
    e.preventDefault();
    setPhoto(null);
    setErrors((prevErrors) => ({ ...prevErrors, photo: "Photo is required" }));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      sessionStorage.clear();
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "gender") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    setMyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: formattedValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    const { name, age, gender, missing_date, last_seen_location, parent_name, parent_phone_number } = myDetails;

    if (!name.trim()) newErrors.name = "Child's Name is required";
    if (!age.trim()) newErrors.age = "Age is required";
    else if (isNaN(age)) newErrors.age = "Age must be a number";
    if (!gender.trim()) newErrors.gender = "Gender is required";
    if (!missing_date.trim()) newErrors.missing_date = "Missing Date is required";
    if (!last_seen_location.trim()) newErrors.last_seen_location = "Last Seen Location is required";
    if (!parent_name.trim()) newErrors.parent_name = "Parent's Name is required";
    if (!parent_phone_number.trim()) newErrors.parent_phone_number = "Contact Number is required";
    else if (!/^\d{10}$/.test(parent_phone_number)) newErrors.parent_phone_number = "Contact Number must be 10 digits";
    if (!photo) newErrors.photo = "Photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", myDetails.name);
      formData.append("age", myDetails.age);
      formData.append("gender", myDetails.gender);
      formData.append("missing_date", myDetails.missing_date);
      formData.append("last_seen_location", myDetails.last_seen_location);
      formData.append("special_features", myDetails.special_features);
      formData.append("parent_name", myDetails.parent_name);
      formData.append("address", myDetails.address);
      formData.append("parent_phone_number", myDetails.parent_phone_number);
      if (photo) {
        if (typeof photo === "string" && photo.startsWith("data:image/")) {
          const blob = await fetch(photo).then((res) => res.blob());
          formData.append("photo", blob, "photo.jpg");
        } else if (photo instanceof File) {
          formData.append("photo", photo);
        }
      }

      try {
        let response;
        if (missingCaseId) {
          response = await fetch(`http://127.0.0.1:8000/api/missingcases/update/${missingCaseId}/`, {
            method: "PUT",
            body: formData,
          });
        } else {
          response = await fetch("http://127.0.0.1:8000/api/missingcases/add/", {
            method: "POST",
            body: formData,
          });
        }

        if (response.ok) {
          const data = await response.json();
          setSavedDetails({ ...myDetails, photo });
          setMissingCaseId(data.id);
          alert("Details saved successfully!");
          setIsEditing(false);
        } else {
          console.error("Failed to save details:", response.status);
        }
      } catch (error) {
        console.error("Error saving details:", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };


  const formatLabel = (key) => {
    const labels = {
      name: "Child's Name",
      age: "Age",
      gender: "Gender",
      missing_date: "Missing Date",
      last_seen_location: "Last Seen Location",
      special_features: "Special Features",
      parent_name: "Parent's Name",
      address: "Address",
      parent_phone_number: "Contact Number",
    };
    return labels[key] || key;
  };

  return (
    <div className="parent-dashboard">
      <main className="content">
        <div className="content-header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <section className="standard-page">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="details-container">
              <div className="photo-section">
                <div className="photo-upload-container">
                  <label htmlFor="photo-upload" className="photo-upload-label">
                    {photo ? (
                      <img src={photo} alt="Profile" className="profile-photo" />
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
                    disabled={!isEditing}
                  />
                  {photo && (
                    <button className="delete-photo" onClick={handleDeletePhoto} type="button">
                      Delete Photo
                    </button>
                  )}
                  {errors.photo && <span className="error-text">{errors.photo}</span>}
                </div>
              </div>

              <div className="info-section">
                <div className="details-card">
                  <h3>Parent & Child Details</h3>
                  <ul>
                    {Object.keys(myDetails).map((key) => (
                      <li key={key}>
                        <strong>{formatLabel(key)}:</strong>
                        {key === "missing_date" ? (
                          <input
                            type="date"
                            name={key}
                            value={myDetails[key]}
                            onChange={handleInputChange}
                            className={errors[key] ? "error-input" : ""}
                            aria-describedby={`${key}Error`}
                          />
                        ) : (
                          <input
                            type="text"
                            name={key}
                            value={myDetails[key]}
                            onChange={handleInputChange}
                            className={errors[key] ? "error-input" : ""}
                            placeholder={`Enter ${formatLabel(key)}`}
                            aria-describedby={`${key}Error`}
                          />
                        )}
                        {errors[key] && <span id={`${key}Error`} className="error-text">{errors[key]}</span>}
                      </li>
                    ))}
                  </ul>
                  <div className="button-group">
                    <button type="submit" className="save-button">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="details-container view-mode">
              <div className="photo-section view-mode">
                {photo && (
                  <div className="photo-preview">
                    <img src={photo} alt="Profile" className="profile-photo" />
                  </div>
                )}
              </div>

              <div className="info-section">
                <div className="details-card view-mode">
                  <h3>Parent & Child Details</h3>
                  <ul>
                    {Object.entries(savedDetails).map(([key, value]) => {
                      if (key === "photo") return null;
                      return (
                        <li key={key}>
                          <strong>{formatLabel(key)}:</strong>
                          <span>{value}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="button-group view-mode">
                    <button type="button" className="edit-button" onClick={handleEdit}>
                      Edit Details
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Parent;