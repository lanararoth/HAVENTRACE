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
    category: '', // Default to 'parent'
    stationName: '',
    stationAddress: '',
    childName: '',
    childAge: '',
    childPhoto: '',
    lastSeenDate: '',
    identificationMark: '',
    lastSeenPlace: '',
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Name validation (only letters and spaces allowed)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }
  
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
  
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
  
    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
    }
  
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
  
    // Police-specific validations
    if (formData.category === 'police') {
      if (!formData.stationName.trim()) {
        newErrors.stationName = 'Station Name is required';
      }
      if (!formData.stationAddress.trim()) {
        newErrors.stationAddress = 'Station Address is required';
      }
    }
  
    // Parent-specific validations
    if (formData.category === 'parent') {
      if (!formData.childName.trim()) {
        newErrors.childName = "Child's Name is required";
      }
      if (!formData.childAge) {
        newErrors.childAge = "Child's Age is required";
      } else if (formData.childAge <= 0) {
        newErrors.childAge = "Child's Age must be a positive number";
      }
      if (!formData.childPhoto) {
        newErrors.childPhoto = "Child's Photo is required";
      }
      if (!formData.lastSeenDate) {
        newErrors.lastSeenDate = 'Last Seen Date is required';
      }
      if (!formData.identificationMark.trim()) {
        newErrors.identificationMark = 'Identification Mark is required';
      }
      if (!formData.lastSeenPlace.trim()) {
        newErrors.lastSeenPlace = 'Last Seen Place is required';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Register Form Data:', formData);

      // Store the form data in localStorage (for Parent page use)
      localStorage.setItem('parentDetails', JSON.stringify(formData));

      // After successful registration, navigate to the appropriate page
      if (formData.category === 'parent') {
        navigate('/parent');
      } else if (formData.category === 'police') {
        navigate('/police');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          {/* Phone Number Field */}
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          {/* Category Field */}
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="parent">Parent</option>
              <option value="police">Police</option>
            </select>
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          {/* Conditional Fields for Police */}
          {formData.category === 'police' && (
            <>
              <div className="input-group">
                <label htmlFor="stationName">Station Name</label>
                <input
                  type="text"
                  id="stationName"
                  name="stationName"
                  placeholder="Enter your station name"
                  value={formData.stationName}
                  onChange={handleChange}
                  required
                />
                {errors.stationName && <span className="error">{errors.stationName}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="stationAddress">Station Address</label>
                <input
                  type="text"
                  id="stationAddress"
                  name="stationAddress"
                  placeholder="Enter your station address"
                  value={formData.stationAddress}
                  onChange={handleChange}
                  required
                />
                {errors.stationAddress && <span className="error">{errors.stationAddress}</span>}
              </div>
            </>
          )}

          {/* Conditional Fields for Parent */}
          {formData.category === 'parent' && (
            <>
              <div className="input-group">
                <label htmlFor="childName">Child's Name</label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  placeholder="Enter your child's name"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                />
                {errors.childName && <span className="error">{errors.childName}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="childAge">Child's Age</label>
                <input
                  type="number"
                  id="childAge"
                  name="childAge"
                  placeholder="Enter your child's age"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                />
                {errors.childAge && <span className="error">{errors.childAge}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="childPhoto">Child's Photo</label>
                <input
                  type="file"
                  id="childPhoto"
                  name="childPhoto"
                  onChange={(e) =>
                    setFormData({ ...formData, childPhoto: e.target.files[0] })
                  }
                  required
                />
                {errors.childPhoto && <span className="error">{errors.childPhoto}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="lastSeenDate">Last Seen Date</label>
                <input
                  type="date"
                  id="lastSeenDate"
                  name="lastSeenDate"
                  value={formData.lastSeenDate}
                  onChange={handleChange}
                  required
                />
                {errors.lastSeenDate && <span className="error">{errors.lastSeenDate}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="identificationMark">Identification Mark</label>
                <input
                  type="text"
                  id="identificationMark"
                  name="identificationMark"
                  placeholder="Enter identification mark"
                  value={formData.identificationMark}
                  onChange={handleChange}
                  required
                />
                {errors.identificationMark && (
                  <span className="error">{errors.identificationMark}</span>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="lastSeenPlace">Last Seen Place</label>
                <input
                  type="text"
                  id="lastSeenPlace"
                  name="lastSeenPlace"
                  placeholder="Enter the last seen place"
                  value={formData.lastSeenPlace}
                  onChange={handleChange}
                  required
                />
                {errors.lastSeenPlace && <span className="error">{errors.lastSeenPlace}</span>}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;