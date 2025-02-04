// src/Routers/Router.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import Ahome from "../pages/home/Home"; 
import MissingCase from "../pages/missingcase/MissingCase";
import View from "../pages/view/View";
import ViewCase from "../pages/view/ViewCase";
import Edit from "../pages/edit/Edit";
import EditCase from "../pages/edit/EditCase";
import AddCase from "../pages/add/Addcase";
import Notify from "../pages/missingcase/Notify";
import Delete from "../pages/missingcase/Delete";
import EmergencyContact from "../pages/emergency/EmergencyContact";
import AddContact from "../pages/add/AddContact";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Ahome />} />
      <Route path="/missingcase" element={<MissingCase />} />
      <Route path="/missingcase/view/:id" element={<ViewCase />} />
      <Route path="/missingcase/view" element={<View />} />
      <Route path="/missingcase/edit/:id" element={<EditCase />} />
      <Route path="/missingcase/edit" element={<Edit />} />
      <Route path="/missingcase/add" element={<AddCase />} />
      <Route path="/missingcase/notify" element={<Notify />} />
      <Route path="/missingcase/delete" element={<Delete />} />
      <Route path="/emergency" element={<EmergencyContact />} />
      <Route path="/emergency/add" element={<AddContact />} />
    </Routes>
  );
};

export default Router;
