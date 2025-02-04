import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emergencyNumbers from "../../assets/data/Emergency";
import "./EmergencyContact.css";

const EmergencyContact = () => {
  const [contacts, setContacts] = useState(emergencyNumbers);
  const [formState, setFormState] = useState({ id: null, service: "", number: "", icon: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // State to manage the alert message

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Update contact
  const handleSubmit = (e) => {
    e.preventDefault();
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === formState.id ? { ...contact, ...formState } : contact
      )
    );
    setFormState({ id: null, service: "", number: "", icon: "" });
    setIsEditing(false);

    // Show success alert for update
    setAlertMessage("Contact updated successfully!");
    setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
  };

  // Delete contact
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));

    // Show success alert for delete
    setAlertMessage("Contact deleted successfully!");
    setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
  };

  // Edit contact
  const handleEdit = (contact) => {
    setFormState(contact);
    setIsEditing(true);
  };

  return (
    <div className="emergency-contacts-container">
      <h2 className="h2">Emergency Contacts</h2>

      {/* Display alert message */}
      {alertMessage && <div className="alert-notification">{alertMessage}</div>}

      {/* Edit form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="edit">
          <input
            type="text"
            name="service"
            placeholder="Service Name"
            value={formState.service}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="number"
            placeholder="Emergency Number"
            value={formState.number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="icon"
            placeholder="Emoji/Icon"
            value={formState.icon}
            onChange={handleChange}
          />
          <button type="submit">Update Contact</button>
        </form>
      )}

      {/* Table for displaying contacts */}
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Icon</th>
            <th>Service</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.icon}</td>
              <td>{contact.service}</td>
              <td>{contact.number}</td>
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

      {/* Add New Contact Button */}
      <div className="add-contact">
        <button className="add-contact-button" onClick={() => navigate("/emergency/add")}>
          Add New Contact
        </button>
      </div>
    </div>
  );
};

export default EmergencyContact;
