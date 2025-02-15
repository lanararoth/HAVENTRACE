import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyContact.css";

const API_URL = "http://127.0.0.1:8000/api/emergency-contacts/";

const EmergencyContact = () => {
  const [contacts, setContacts] = useState([]);
  const [formState, setFormState] = useState({ id: null, service_name: "", contact_number: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate();

  // Fetch emergency contacts from API
  useEffect(() => {
    fetch(`${API_URL}get/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch contacts: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContacts(data);
        setErrorMessage(""); // Clear error message on success
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setErrorMessage("Failed to load emergency contacts. Please try again later.");
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Update contact in the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.id) {
      console.error("No contact selected for update");
      return;
    }

    try {
      const response = await fetch(`${API_URL}update/${formState.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_name: formState.service_name,
          contact_number: formState.contact_number,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update contact: ${response.status}`);
      }

      const updatedContacts = await fetch(`${API_URL}get/`).then((res) => res.json());
      setContacts(updatedContacts); // Refresh contact list

      setFormState({ id: null, service_name: "", contact_number: "" });
      setIsEditing(false);
      setAlertMessage("Contact updated successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Update Error:", error);
      setAlertMessage("Failed to update contact. Please try again.");
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}delete/${id}/`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.status}`);
      }

      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      setAlertMessage("Contact deleted successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Delete Error:", error);
      setAlertMessage("Failed to delete contact. Please try again.");
    }
  };

  // Edit contact
  const handleEdit = (contact) => {
    setFormState(contact);
    setIsEditing(true);
  };

  return (
    <div className="emergency-contacts-container">
      <h2 className="h2">Emergency Contacts</h2>
      {alertMessage && <div className="alert-notification">{alertMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}

      {/* Edit Contact Form */}
      {isEditing && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="service_name"
              placeholder="Service Name"
              value={formState.service_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formState.contact_number}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button">
              Update Contact
            </button>
          </form>
        </div>
      )}

      {/* Emergency Contact Table */}
      {contacts.length > 0 ? (
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Service</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.service_name}</td>
                <td>{contact.contact_number}</td>
                <td>
                  <button className="button" onClick={() => handleEdit(contact)}>
                    Edit
                  </button>
                  <button className="button" onClick={() => handleDelete(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !errorMessage && <p className="no-contacts-message">No emergency contacts found.</p> // Fallback message if no contacts
      )}

      {/* Add Contact Button */}
      <div className="add-contact">
        <button className="add-contact-button" onClick={() => navigate("/emergency/add")}>
          Add New Contact
        </button>
      </div>
    </div>
  );
};

export default EmergencyContact;
