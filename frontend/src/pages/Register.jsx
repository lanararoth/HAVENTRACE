import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    phone_number: '',
    user_type: '',
  });

  const [parentData, setParentData] = useState({
    parent_name: '',
    contact_number: '',
    address: '',
    child_name: '',
  });

  const [policeData, setPoliceData] = useState({
    station_name: '',
    station_address: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (registerData.hasOwnProperty(name)) {
      setRegisterData({ ...registerData, [name]: value });
    } else if (parentData.hasOwnProperty(name)) {
      setParentData({ ...parentData, [name]: value });
    } else if (policeData.hasOwnProperty(name)) {
      setPoliceData({ ...policeData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

 


  const validateForm = () => {
    const newErrors = {};
    
    if (!registerData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[A-Za-z\s]+$/.test(registerData.username.trim())) {
      newErrors.username = 'Username should contain only letters and spaces';
    }
    
    if (!registerData.email.trim() || !/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!registerData.password.trim() || registerData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(registerData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    
    if (registerData.password2 !== registerData.password) {
      newErrors.password2 = 'Passwords do not match';
    }
    
    if (!registerData.phone_number.trim() || !/^\d{10}$/.test(registerData.phone_number)) {
      newErrors.phone_number = 'Valid 10-digit phone number required';
    }
    
    if (!registerData.user_type) {
      newErrors.user_type = 'User type is required';
    }
    
    if (registerData.user_type === 'parent') {
      if (!parentData.parent_name.trim()) {
        newErrors.parent_name = "Parent's Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(parentData.parent_name.trim())) {
        newErrors.parent_name = "Parent's Name should contain only letters and spaces";
      }
    
      if (!parentData.contact_number.trim() || !/^\d{10}$/.test(parentData.contact_number)) {
        newErrors.contact_number = 'Valid contact number required';
      }
    
      if (!parentData.address.trim()) {
        newErrors.address = 'Address is required';
      }
    
      if (!parentData.child_name.trim()) {
        newErrors.child_name = "Child's Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(parentData.child_name.trim())) {
        newErrors.child_name = "Child's Name should contain only letters and spaces";
      }
    }
    
    if (registerData.user_type === 'police') {
      if (!policeData.station_name.trim()) {
        newErrors.station_name = 'Station Name is required';
      } else if (!/^[A-Za-z\s]+$/.test(policeData.station_name.trim())) {
        newErrors.station_name = 'Station Name should contain only letters and spaces';
      }
    
      if (!policeData.station_address.trim()) {
        newErrors.station_address = 'Station Address is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const baseUrl = 'http://127.0.0.1:8000/api';
    let endpoint = '/auth/register/';
    let payload = { ...registerData };
  
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        return;
      }
  
      const data = await response.json();
      console.log('Success:', data);

      if (registerData.user_type === "parent") {
        let parentPayload = Object.assign({},parentData) 
        parentPayload={
          ...parentData,
          email: registerData.email, // Ensuring email is included
        };
  
        const parentResponse = await fetch(`${baseUrl}/parents/add/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parentPayload),
        });
  
        if (!parentResponse.ok) {
          const parentError = await parentResponse.json();
          console.error('Parent Registration Error:', parentError);
          return;
        }
  
        const parentDataResponse = await parentResponse.json();
        console.log('Parent Registered Successfully:', parentDataResponse);

        navigate('/login')

      }

      // If the user is a police officer, add police details (optional)
        if (registerData.user_type === 'police') {
          const policePayload = {
            ...policeData,
          };

          const policeResponse = await fetch(`${baseUrl}/police/add/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(policePayload),
          });

          if (!policeResponse.ok) {
            const policeError = await policeResponse.json();
            console.error('Police Registration Error:', policeError);
            return;
          }

          const policeDataResponse = await policeResponse.json();
          console.log('Police Registered Successfully:', policeDataResponse);

          navigate('/login');
        }


      localStorage.setItem('userDetails', JSON.stringify(data));

      
    } 
    
    catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={registerData.username} onChange={handleChange} required />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={registerData.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={registerData.password} onChange={handleChange} required />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" id="password2" name="password2" value={registerData.password2} onChange={handleChange} required />
            {errors.password2 && <span className="error">{errors.password2}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input type="text" id="phone_number" name="phone_number" value={registerData.phone_number} onChange={handleChange} required />
            {errors.phone_number && <span className="error">{errors.phone_number}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="user_type">Category</label>
            <select id="user_type" name="user_type" value={registerData.user_type} onChange={handleChange} required>
              <option value="" disabled>Select Category</option>
              <option value="parent">Parent</option>
              <option value="police">Police</option>
            </select>
            {errors.user_type && <span className="error">{errors.user_type}</span>}
          </div>

          {registerData.user_type === 'parent' && (
            <>
              <div className="input-group">
                <label htmlFor="parent_name">Parent's Name</label>
                <input type="text" id="parent_name" name="parent_name" value={parentData.parent_name} onChange={handleChange} required />
                {errors.parent_name && <span className="error">{errors.parent_name}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="contact_number">Contact Number</label>
                <input type="text" id="contact_number" name="contact_number" value={parentData.contact_number} onChange={handleChange} required />
                {errors.contact_number && <span className="error">{errors.contact_number}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" value={parentData.address} onChange={handleChange} required />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
              
              <div className="input-group">
                <label htmlFor="child_name">Child's Name</label>
                <input type="text" id="child_name" name="child_name" value={parentData.child_name} onChange={handleChange} required />
                {errors.child_name && <span className="error">{errors.child_name}</span>}
              </div>
            </>
          )}

          {registerData.user_type === 'police' && (
            <>
              <div className="input-group">
                <label htmlFor="station_name">Station Name</label>
                <input type="text" id="station_name" name="station_name" value={policeData.station_name} onChange={handleChange} required />
                {errors.station_name && <span className="error">{errors.station_name}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="station_address">Station Address</label>
                <input type="text" id="station_address" name="station_address" value={policeData.station_address} onChange={handleChange} required />
                {errors.station_address && <span className="error">{errors.station_address}</span>}
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