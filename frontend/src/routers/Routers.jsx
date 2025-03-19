import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MissingCases from '../pages/MissingCases';
import MissingDetails from '../pages/MissingDetails';
import Upload from '../pages/Upload';
import EmergencyNumbers from '../pages/EmergencyNumbers';
import Admin from '../pages/Admin';
import Parent from '../pages/Parent';
import Police from '../pages/Police';
import PoliceDetails from '../pages/PoliceDetails';
import PoliceList from '../pages/PoliceList';
import ContactUs from '../pages/ContactUs';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={< Login />} />
      <Route path="/register" element={< Register />} />
      <Route path="/emergency" element={<EmergencyNumbers />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/stations" element={<PoliceList />} />
      <Route path="/stations/:id" element={<PoliceDetails />} />
      <Route path="/missing" element={<MissingCases />} />
      <Route path="/details/:id" element={<MissingDetails />} />
      <Route path="/parent" element={<Parent />} />
      <Route path="/police" element={<Police />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default Routers;
