import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddContact = ({ setContacts }) => {
  const [formState, setFormState] = useState({ service: "", number: "", icon: "" });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Add new contact
  const handleSubmit = (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const confirmAdd = window.confirm("Are you sure you want to add this contact?");
    if (confirmAdd) {
      // Add the new contact
      const newContact = { ...formState, id: Date.now() };
      setContacts((prev) => [...prev, newContact]);

      // Show success toast
      toast.success("Contact added successfully!");

      // Delay navigation to allow the toast to be visible
      setTimeout(() => {
        navigate("/emergency");
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <div className="add-case-container">
      <h1>Add New Emergency Contact</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="add-contact-button">Add Contact</button>
      </form>
      <ToastContainer />
    </div>
  );
};

AddContact.propTypes = {
  setContacts: PropTypes.func.isRequired,
};

export default AddContact;