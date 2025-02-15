import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    category: '',
    stationName: '',
    stationAddress: '',
    parentName: '',
    parentContact: '',
    parentAddress: '',
    parentEmail: '',
    childName: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for the field when it changes
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Username
    if (!formData.name.trim()) {
      newErrors.name = 'Username is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Username should contain only letters and spaces';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    // Validate Confirm Password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate Phone Number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
    }

    // Validate Category
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    // Validate Police Station Details
    if (formData.category === 'police') {
      if (!formData.stationName.trim()) {
        newErrors.stationName = 'Station Name is required';
      }
      if (!formData.stationAddress.trim()) {
        newErrors.stationAddress = 'Station Address is required';
      }
    }

    // Validate Parent Details
    if (formData.category === 'parent') {
      if (!formData.parentName.trim()) {
        newErrors.parentName = "Parent's Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.parentName)) {
        newErrors.parentName = "Parent's Name should contain only letters and spaces";
      }
      if (!formData.parentContact.trim()) {
        newErrors.parentContact = 'Contact Number is required';
      } else if (!/^\d{10}$/.test(formData.parentContact)) {
        newErrors.parentContact = 'Valid Contact Number is required';
      }
      if (!formData.parentAddress.trim()) {
        newErrors.parentAddress = 'Parent Address is required';
      }
      if (!formData.parentEmail.trim()) {
        newErrors.parentEmail = "Parent's Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
        newErrors.parentEmail = 'Valid Email is required';
      }
      if (!formData.childName.trim()) {
        newErrors.childName = "Child's Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.childName)) {
        newErrors.childName = "Child's Name should contain only letters and spaces";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Register Form Data:', formData);
      localStorage.setItem('parentDetails', JSON.stringify(formData));
      navigate(formData.category === 'parent' ? '/parent' : '/police');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required>
              <option value="" disabled>Select Category</option>
              <option value="parent">Parent</option>
              <option value="police">Police</option>
            </select>
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          {formData.category === 'parent' && (
            <>
              <div className="input-group">
                <label htmlFor="parentName">Parent's Name</label>
                <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} required />
                {errors.parentName && <span className="error">{errors.parentName}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="parentContact">Contact Number</label>
                <input type="text" id="parentContact" name="parentContact" value={formData.parentContact} onChange={handleChange} required />
                {errors.parentContact && <span className="error">{errors.parentContact}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="parentAddress">Address</label>
                <input type="text" id="parentAddress" name="parentAddress" value={formData.parentAddress} onChange={handleChange} required />
                {errors.parentAddress && <span className="error">{errors.parentAddress}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="parentEmail">Parent's Email</label>
                <input type="email" id="parentEmail" name="parentEmail" value={formData.parentEmail} onChange={handleChange} required />
                {errors.parentEmail && <span className="error">{errors.parentEmail}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="childName">Child's Name</label>
                <input type="text" id="childName" name="childName" value={formData.childName} onChange={handleChange} required />
                {errors.childName && <span className="error">{errors.childName}</span>}
              </div>
            </>
          )}

          {formData.category === 'police' && (
            <>
              <div className="input-group">
                <label htmlFor="stationName">Station Name</label>
                <input type="text" id="stationName" name="stationName" value={formData.stationName} onChange={handleChange} required />
                {errors.stationName && <span className="error">{errors.stationName}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="stationAddress">Station Address</label>
                <input type="text" id="stationAddress" name="stationAddress" value={formData.stationAddress} onChange={handleChange} required />
                {errors.stationAddress && <span className="error">{errors.stationAddress}</span>}
              </div>
            </>
          )}

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;