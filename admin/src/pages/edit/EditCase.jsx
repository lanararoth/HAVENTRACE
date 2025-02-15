import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCase.css";

const API_BASE = "http://127.0.0.1:8000/api/missingcases/";

const EditCase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await fetch(`${API_BASE}get/${id}/`);
        if (!response.ok) throw new Error(`Failed to fetch case: ${response.statusText}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching case:", error);
      }
    };
    fetchCase();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("last_seen_location", formData.last_seen_location);
    formDataToSend.append("parent_phone_number", formData.parent_phone_number);
  
    // Add missing fields
    formDataToSend.append("missing_date", formData.missing_date || ""); // Ensure it's included
    formDataToSend.append("parent_name", formData.parent_name || ""); 
    formDataToSend.append("address", formData.address || "");
  
    // Check if the photo field exists and is a File
    if (formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/missingcases/update/${id}/`, {
        method: "PUT",
        body: formDataToSend, // Send as FormData
      });
  
      const result = await response.json();
      console.log("Server Response:", result);
  
      if (response.ok) {
        alert("Case updated successfully!");
        navigate("/missingcase");
      } else {
        alert(`Failed to update case: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error("Error updating case:", error);
      alert("Network error. Check console for details.");
    }
  };
  
  
  
  

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="edit-case-container">
      <h1>Edit Missing Case</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        
        <label>Current Photo:</label>
{formData.photo && (
  <div>
    <img
      src={`http://127.0.0.1:8000${formData.photo}`} // Adjust if necessary
      alt="Missing Person"
      style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
    />
  </div>
)}

<label>Upload New Photo:</label>
<input
  type="file"
  name="photo"
  accept="image/*"
  onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
/>

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Last Seen Location:</label>
        <input type="text" name="last_seen_location" value={formData.last_seen_location} onChange={handleInputChange} required />

        <label>Missing Date:</label>
<input
  type="date"
  name="missing_date"
  value={formData.missing_date}
  onChange={handleInputChange}
  required
/>

<label>Parent Name:</label>
<input
  type="text"
  name="parent_name"
  value={formData.parent_name}
  onChange={handleInputChange}
  required
/>

<label>Address:</label>
<input
  type="text"
  name="address"
  value={formData.address}
  onChange={handleInputChange}
  required
/>


        <label>Contact:</label>
        <input type="text" name="parent_phone_number" value={formData.parent_phone_number} onChange={handleInputChange} required />

        <button type="submit">Update Case</button>
        <button type="button" onClick={() => navigate("/missingcase")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCase;
