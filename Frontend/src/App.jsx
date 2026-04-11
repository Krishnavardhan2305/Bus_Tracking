import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCollege from "./pages/CreateCollege";
import CreateAdmin from "./pages/CreateAdmin";
import ViewColleges from "./pages/ViewColleges";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/superadminlogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-college" element={<CreateCollege />} />
        <Route path="/create-admin" element={<CreateAdmin />} />
        <Route path="/colleges" element={<ViewColleges />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;