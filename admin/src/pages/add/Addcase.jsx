import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCase.css";

const AddCase = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    photo: null,
    missing_date: "",
    last_seen_location: "",
    special_features: "",  // Added Special Features
    parent_name: "",
    address: "",
    parent_phone_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/missingcases/add/", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Case added successfully!");
      localStorage.setItem("newCaseAdded", "true"); // Set flag for update
      navigate("/missingcase");
    } catch (error) {
      console.error("Failed to add case:", error);
      alert("Failed to add case");
    }
  };

  return (
    <div className="add-case-container">
      <h1>Add New Missing Case</h1>
      <form onSubmit={handleSubmit}>
        <h3>Case Details</h3>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Missing Date:</label>
          <input type="date" name="missing_date" value={formData.missing_date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Last Seen Location:</label>
          <input type="text" name="last_seen_location" value={formData.last_seen_location} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Special Features:</label>
          <textarea
            name="special_features"
            value={formData.special_features}
            onChange={handleInputChange}
            placeholder="Describe any identifying marks, scars, tattoos, or special features"
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Photo:</label>
          <input type="file" name="photo" accept="image/*" onChange={handleInputChange} required />
        </div>

        <h3>Parent Details</h3>
        <div className="form-group">
          <label>Parent Name:</label>
          <input type="text" name="parent_name" value={formData.parent_name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Parent Contact:</label>
          <input type="text" name="parent_phone_number" value={formData.parent_phone_number} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Parent Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>

        <div className="button-container">
          <button type="submit" className="save-button">Add Case</button>
          <button type="button" onClick={() => navigate("/missingcase")} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCase;
